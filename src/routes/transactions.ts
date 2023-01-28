import express from "express";
import { getTransactionHistory } from "../controller/transaction";
import { isAuthenticated } from "../Middlewares/auth";

const router = express.Router();


router.get("/", isAuthenticated, getTransactionHistory);

export default router;