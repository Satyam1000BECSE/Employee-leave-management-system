import express from "express";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import validate from "../middleware/validate.middleware.js";

import { applyLeaveValidator } from "../validators/leave.validator.js";

import {
  applyLeave,
  getLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
  getPendingLeaves,
  approveLeave,
  rejectLeave,
} from "../controllers/leave.controller.js";

const router = express.Router();

/**
 * @swagger
 * /leaves:
 *   post:
 *     summary: Apply for leave
 *
 *     tags:
 *       - Leaves
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               leaveType:
 *                 type: string
 *
 *               startDate:
 *                 type: string
 *
 *               endDate:
 *                 type: string
 *
 *               reason:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Leave created successfully
 */

router.post(
  "/",
  protect,
  authorize("employee"),
  applyLeaveValidator,
  validate,
  applyLeave
);

/**
 * @swagger
 * /leaves:
 *   get:
 *     summary: Get all leaves
 *
 *     tags:
 *       - Leaves
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: List of leaves
 */
router.get("/", protect, getLeaves);

router.get("/:id", protect, getLeaveById);

router.put(
  "/:id",
  protect,
  authorize("employee"),
  updateLeave
);

router.delete(
  "/:id",
  protect,
  authorize("employee"),
  deleteLeave
);

router.get(
  "/pending/all",
  protect,
  authorize("manager"),
  getPendingLeaves
);

/**
 * @swagger
 * /leaves/{id}/approve:
 *   put:
 *     summary: Approve leave request
 *
 *     tags:
 *       - Manager
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Leave approved
 */
router.put(
  "/:id/approve",
  protect,
  authorize("manager"),
  approveLeave
);

/**
 * @swagger
 * /leaves/{id}/reject:
 *   put:
 *     summary: Reject leave request
 *
 *     tags:
 *       - Manager
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               managerComments:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Leave rejected
 */
router.put(
  "/:id/reject",
  protect,
  authorize("manager"),
  rejectLeave
);

export default router;