FROM node:16.16.0 as base

# Add package file
COPY package.json ./
COPY yarn.lock ./

# Install deps
RUN yarn install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

#Run migration
RUN yarn migrate:latest --knexfile src/database/knexfile.ts

# Build
RUN yarn compile


# Start production image build
FROM gcr.io/distroless/nodejs:16

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /build /build

# Expose port 3000
EXPOSE 3001


CMD ["build/src/app.js"]