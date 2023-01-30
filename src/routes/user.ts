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

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phoneNumber
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the use
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         id: 83eb2cb1-bf9b-4365-9f6f-2bb7aabec86d
 *         firstName: Anthony
 *         lastNmae:  Iwuji
 *         email: example@gmail.com
 *         phoneNumber: +2348065661350
 *         password: pa$$word-123
 */

/**
 * @swagger
 * tags:
 *   name: user
 *   description: The user registration API
 * /api/v1/users:
 *   post:
 *     summary: Register a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: internal server error
 */
router.post("/", register);

/**
 * @swagger
 * tags:
 *   name: user
 *   description: Fund transfer API
 * /api/v1/users/fund-transfer:
 *   post:
 *     summary: Transfer fund to other users
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 walletId:
 *                   type: string
 *                 amount:
 *                   type: integer
 *                 description:
 *                   type: string
 *     responses:
 *       200:
 *         description: Fund transfer successful.
 *       500:
 *         description: internal server error
 */
router.post("/fund-transfer", isAuthenticated, fundTransfer);

/**
 * @swagger
 * tags:
 *   name: user
 *   description: Fund wallet API
 * /api/v1/users/fund-me:
 *   post:
 *     summary: Fund my wallet
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 amount:
 *                   type: integer
 *                 description:
 *                   type: string
 *     responses:
 *       200:
 *         description: Wallet successfully credited
 *       500:
 *         description: internal server error
 */
router.post("/fund-me", isAuthenticated, fundMyWallet);

/**
 * @swagger
 * tags:
 *   name: user
 *   description: Withdraw fund API
 * /api/v1/users/fund-withdrawal:
 *   post:
 *     summary: Fund withdrawal
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 amount:
 *                   type: integer
 *                 description:
 *                   type: string
 *     responses:
 *       200:
 *         description: withdrawal successful
 *       500:
 *         description: internal server error
 */
router.post("/fund-withdrawal", isAuthenticated, withdrawFund);

/**
 * @swagger
 * tags:
 *   name: user
 *   description: Wallet info API
 * /api/v1/users/wallet-info:
 *   get:
 *     summary: get wallet balance and other info
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: wallet info successfully retrieved.
 *       500:
 *         description: internal server error
 */
router.get("/wallet-info", isAuthenticated, getWalletInfo);

export default router;