import { Request, Response, Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger API Documentation for Demo credit App",
      version: "1.0.0",
      description:
        "Domo credit wallet api documentation",
      contact: {
        name: "Iwuji Anthony",
        url: "https://www.linkedin.com/in/anabizconcept/",
        email: "anabizconcept9@gmail.com",
      },
    },

    components: {
      securitySchemes: {
        Authorization: {
          in: "header",
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>"
      },
      },
    },

    security: [
      {
        Authorization: [],
      },
    ],
    host: process.env.BASE_URL,
    basePath: "/api/v1",
  },

  apis: ["./src/routes/*.ts","./build/src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDoc = async (app: Application) => {
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}));

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
