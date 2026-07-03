import express from "express";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import {
  employeeDashboard,
  managerDashboard,
} from "../controllers/dashboard.controller.js";

const router = express.Router();


// Employee Dashboard

/**
 * @swagger
 * /dashboard/employee:
 *   get:
 *     summary: Employee dashboard statistics
 *
 *     tags:
 *       - Dashboard
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Employee dashboard data
 */
router.get(
  "/employee",
  protect,
  authorize("employee"),
  employeeDashboard
);


// Manager Dashboard

/**
 * @swagger
 * /dashboard/manager:
 *   get:
 *     summary: Manager dashboard statistics
 *
 *     tags:
 *       - Dashboard
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Manager dashboard data
 */
router.get(
  "/manager",
  protect,
  authorize("manager"),
  managerDashboard
);

export default router;