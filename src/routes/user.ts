import express from "express";
import { register, creditWallet } from "../controller/user";
import { isAuthenticated } from "../Middlewares/auth";
const router = express.Router();


router.post("/", register);
router.post("/:id/credit", isAuthenticated, creditWallet)

export default router;