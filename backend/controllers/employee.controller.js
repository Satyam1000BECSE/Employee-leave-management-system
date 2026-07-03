import User from "../models/User.js";
import Leave from "../models/Leave.js";



// Get all employees

export const getEmployees = async (
  req,
  res
) => {
  try {
     const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    const employees = await User.find({
      role: "employee",
    }).select("-password");

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// Get employee by id

export const getEmployeeById = async (
  req,
  res
) => {
  try {
    const employee = await User.findById(
      req.params.id
    ).select("-password");

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// Employee leave history

export const getEmployeeHistory = async (
  req,
  res
) => {
  try {
    const leaves = await Leave.find({
      employee: req.params.id,
    });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};