import express from "express";
import { 
    register, 
    fundMyWallet, 
    fundTransfer,
    withdrawFund, 
    getWalletInfo
} from "../controller/user";
import { isAuthenticated } from "../Middlewares/auth";
const router = express.Router();


router.post("/", register);
router.post("/fund-transfer", isAuthenticated, fundTransfer);
router.post("/fund-me", isAuthenticated, fundMyWallet);
router.post("/fund-withdrawal", isAuthenticated, withdrawFund);
router.get("/wallet-info", isAuthenticated, getWalletInfo);

export default router;