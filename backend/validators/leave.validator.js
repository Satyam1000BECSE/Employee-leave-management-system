import { body } from "express-validator";

export const applyLeaveValidator = [
  body("leaveType")
    .notEmpty()
    .withMessage("Leave type is required")
    .isIn(["Sick", "Casual", "Annual"])
    .withMessage("Invalid leave type"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Invalid start date"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("Invalid end date"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 5, max: 500 })
    .withMessage(
      "Reason must be between 5 and 500 characters"
    ),
];