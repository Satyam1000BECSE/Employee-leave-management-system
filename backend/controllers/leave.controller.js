import Leave from "../models/Leave.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import createAuditLog from "../utils/createAuditLog.js";



// =============================
// Apply Leave
// =============================

export const applyLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        const leave = await Leave.create({
            employee: req.user._id,
            leaveType,
            startDate,
            endDate,
            reason,
        });

        await createAuditLog({
            userId: req.user._id,
            action: "APPLY_LEAVE",
            entity: "Leave",
            entityId: leave._id,
            details: "Employee applied for leave"
        });

        res.status(201).json({
            success: true,
            message: "Leave applied successfully",
            leave,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// =============================
// Get All Leaves
// Employee -> own leaves
// Manager -> all leaves
// Search + Filter + Pagination
// =============================

export const getLeaves = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const query = {};

        // Employee can see only own leaves
        if (req.user.role === "employee") {
            query.employee = req.user._id;
        }

        // Filters
        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.leaveType) {
            query.leaveType = req.query.leaveType;
        }

        if (req.query.search) {
            query.reason = {
                $regex: req.query.search,
                $options: "i",
            };
        }

        if (req.query.startDate) {
            query.startDate = {
                $gte: new Date(req.query.startDate),
            };
        }

        if (req.query.endDate) {
            query.endDate = {
                $lte: new Date(req.query.endDate),
            };
        }

        const leaves = await Leave.find(query)
            .populate("employee", "name email department")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            total: leaves.length,
            page,
            leaves,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// =============================
// Get Leave By Id
// =============================

export const getLeaveById = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id)
            .populate("employee", "name email department");

        if (!leave) {
            return res.status(404).json({
                message: "Leave not found",
            });
        }

        res.json(leave);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// =============================
// Update Leave
// Only Pending Leave
// =============================

export const updateLeave = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({
                message: "Leave not found",
            });
        }

        // Only owner
        if (
            leave.employee.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not allowed",
            });
        }

        // Only pending
        if (leave.status !== "Pending") {
            return res.status(400).json({
                message: "Only pending leave can be updated",
            });
        }

        leave.leaveType =
            req.body.leaveType || leave.leaveType;

        leave.startDate =
            req.body.startDate || leave.startDate;

        leave.endDate =
            req.body.endDate || leave.endDate;

        leave.reason =
            req.body.reason || leave.reason;

        await leave.save();

        await createAuditLog({
            userId: req.user._id,
            action: "UPDATE_LEAVE",
            entity: "Leave",
            entityId: leave._id,
            details: "Employee updated leave request"
        });

        res.json({
            success: true,
            message: "Leave updated",
            leave,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// =============================
// Cancel/Delete Leave
// =============================

export const deleteLeave = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({
                message: "Leave not found",
            });
        }

        if (
            leave.employee.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not allowed",
            });
        }

        if (leave.status !== "Pending") {
            return res.status(400).json({
                message:
                    "Only pending leave can be deleted",
            });
        }

        await createAuditLog({
            userId: req.user._id,
            action: "DELETE_LEAVE",
            entity: "Leave",
            entityId: leave._id,
            details: "Employee deleted leave request"
        });

        await leave.deleteOne();

        res.json({
            success: true,
            message: "Leave deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};



// =============================
// Pending Leaves
// Manager Only
// =============================

export const getPendingLeaves = async (
    req,
    res
) => {
    try {
        const leaves = await Leave.find({
            status: "Pending",
        }).populate(
            "employee",
            "name email department"
        );

        res.json(leaves);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};



// =============================
// Approve Leave
// =============================

export const approveLeave = async (
    req,
    res
) => {
    try {
        const leave = await Leave.findById(
            req.params.id
        );

        if (!leave) {
            return res.status(404).json({
                message: "Leave not found",
            });
        }

        leave.status = "Approved";

        const employee = await User.findById(
            leave.employee
        );

        if (leave.leaveType === "Casual") {
            employee.leaveBalance.casual -= 1;
        }

        if (leave.leaveType === "Sick") {
            employee.leaveBalance.sick -= 1;
        }

        if (leave.leaveType === "Annual") {
            employee.leaveBalance.annual -= 1;
        }

        await employee.save();

        await leave.save();

        try {

            await sendEmail(
                employee.email,
                "Leave Approved",
                "Your leave request has been approved."
            );

        } catch (error) {

            console.log(
                "Email service unavailable:",
                error.message
            );
        }

        // Audit Log Save
        await createAuditLog({
            userId: req.user._id,
            action: "APPROVE_LEAVE",
            entity: "Leave",
            entityId: leave._id,
            details: `Approved leave ${leave._id}`
        });

        res.json({
            success: true,
            message: "Leave Approved",
            leave,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// =============================
// Reject Leave
// =============================

export const rejectLeave = async (
    req,
    res
) => {
    try {

        const leave = await Leave.findById(
            req.params.id
        );

        if (!leave) {
            return res.status(404).json({
                message: "Leave not found",
            });
        }

        const employee =
            await User.findById(
                leave.employee
            );

        leave.status = "Rejected";

        leave.managerComments =
            req.body.managerComments;

        await leave.save();

        try {

            await sendEmail(
                employee.email,
                "Leave Rejected",
                "Your leave request has been rejected."
            );

        } catch (error) {

            console.log(
                "Email service unavailable:",
                error.message
            );
        }

        await createAuditLog({
            userId: req.user._id,
            action: "REJECT_LEAVE",
            entity: "Leave",
            entityId: leave._id,
            details: "Manager rejected leave request"
        });

        res.json({
            success: true,
            message: "Leave Rejected",
            leave,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};
