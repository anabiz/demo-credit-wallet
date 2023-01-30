import express from "express";
import { getTransactionHistory } from "../controller/transaction";
import { isAuthenticated } from "../Middlewares/auth";

const router = express.Router();

/**
 * @openapi
 * /api/v1/transactions:
 *  get:
 *     tags: [Transactions]
 *     security:
 *       - Authorization: []
 *     description: Get user tansaction history
 *     parameters:
 *       - name: currentPage
 *         in: query
 *         required: false
 *         type: string
 *       - name: perPage
 *         in: query
 *         required: false
 *         type: string
 *       - name: tranType
 *         in: query
 *         required: false
 *         type: string
 *       - name: status
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *        200:
 *          description: Transactions successfully retrieved
 *        500:
 *          description: internal server error
 */
router.get("/", isAuthenticated, getTransactionHistory);

export default router;