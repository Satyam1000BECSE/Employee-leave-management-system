import Leave from "../models/Leave.js";
import User from "../models/User.js";


// =======================================
// Employee Dashboard
// =======================================

export const employeeDashboard = async (
  req,
  res
) => {
  try {
    const employeeId = req.user._id;

    const totalLeaves = await Leave.countDocuments({
      employee: employeeId,
    });

    const approvedLeaves =
      await Leave.countDocuments({
        employee: employeeId,
        status: "Approved",
      });

    const pendingLeaves =
      await Leave.countDocuments({
        employee: employeeId,
        status: "Pending",
      });

    const rejectedLeaves =
      await Leave.countDocuments({
        employee: employeeId,
        status: "Rejected",
      });

    const recentActivities = await Leave.find({
      employee: employeeId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      stats: {
        totalLeaves,
        approvedLeaves,
        pendingLeaves,
        rejectedLeaves,
      },

      recentActivities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// =======================================
// Manager Dashboard
// =======================================

export const managerDashboard = async (
  req,
  res
) => {
  try {
    const totalEmployees =
      await User.countDocuments({
        role: "employee",
      });

    const totalLeaves =
      await Leave.countDocuments();

    const pendingApprovals =
      await Leave.countDocuments({
        status: "Pending",
      });

    const approvedLeaves =
      await Leave.countDocuments({
        status: "Approved",
      });

    const rejectedLeaves =
      await Leave.countDocuments({
        status: "Rejected",
      });

    const recentActivities =
      await Leave.find()
        .populate(
          "employee",
          "name department"
        )
        .sort({ createdAt: -1 })
        .limit(10);

    res.status(200).json({
      success: true,

      stats: {
        totalEmployees,
        totalLeaves,
        pendingApprovals,
        approvedLeaves,
        rejectedLeaves,
      },

      recentActivities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};