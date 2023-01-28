import express from "express";
import { 
    register, 
    fundMyWallet, 
    fundTransfer,
    withdrawFund 
} from "../controller/user";
import { isAuthenticated } from "../Middlewares/auth";
const router = express.Router();


router.post("/", register);
router.post("/fund-transfer", isAuthenticated, fundTransfer);
router.post("/fund-me", isAuthenticated, fundMyWallet);
router.post("/fund-withdrawal", isAuthenticated, withdrawFund);

export default router;