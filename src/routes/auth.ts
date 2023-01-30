import express from "express";
import {  login } from "../controller/auth";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: example@gmail.com
 *         password: pa$$word-123
 */ 
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       required:
 *         - token
 *         - password
 *       properties:
 *         token:
 *           type: string
 *           description: user token
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1ZWIwNWY5LTk2ZmEtNDIwMi1hOWIxLTRiZWQ2ZTYwMDBkNiIsImVtYWlsIjoiYW5hYml6eVJAZ21haWwuY29tIiwiaWF0IjoxNjc1MDAyMjM4LCJleHAiOjE2NzUwMDk0Mzh9.30FoDdp8-EM9yaQMyvwWzkxvPBIPPLqDorqj8qTyo6w
 */

/**
 * @openapi
 * '/api/v1/auth/login':
 *  post:
 *    tags: 
 *      - Auth
 *    summary: Login a user
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *    responses:
 *       200:
 *         description: Login successful
 *         content: 
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/LoginResponse'
 *       500:
 *         description: internal server error
 *
 */
router.post("/login", login);

export default router;