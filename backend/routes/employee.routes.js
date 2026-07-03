import express from "express";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import {
  getEmployees,
  getEmployeeById,
  getEmployeeHistory,
} from "../controllers/employee.controller.js";

const router = express.Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *
 *     tags:
 *       - Employees
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Employees fetched successfully
 */
router.get(
  "/",
  protect,
  authorize("manager"),
  getEmployees
);

router.get(
  "/:id",
  protect,
  authorize("manager"),
  getEmployeeById
);

router.get(
  "/:id/history",
  protect,
  authorize("manager"),
  getEmployeeHistory
);

export default router;