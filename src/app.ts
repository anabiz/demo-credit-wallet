import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import usersRouter from "./routes/user";
import authRouter from "./routes/auth";
import transactionRouter from "./routes/transactions";
import dotenv from "dotenv";
import { swaggerDoc } from "./Config/swaggerDoc";
import { 
  appError, 
  errorHandler, 
  notFound 
} from "./Middlewares/errorHandlers";

dotenv.config();

const app = express();

app.use(cors({origin: "*", credentials: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());

swaggerDoc(app);


//routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/transactions", transactionRouter);

app.get("/", (req, res) => {
  res.status(200).send("api is running...");
});

// not found error handler
app.use(notFound);

// error handler
app.use(errorHandler);

app.use(appError);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
