import express from "express";

import {
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

import { loginValidator } from "../validators/auth.validator.js";

import validate from "../middleware/validate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *
 *               password:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Login successful
 *
 *       401:
 *         description: Invalid credentials
 */

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.post("/logout", logout);
router.post("/register", register);

export default router;