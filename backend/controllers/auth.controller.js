import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const login = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return next(
        new ApiError(
          401,
          "Invalid credentials"
        )
      );
    }

    const isMatch =
      await user.matchPassword(password);

    if (!isMatch) {
      return next(
        new ApiError(
          401,
          "Invalid credentials"
        )
      );
    }

    const token = generateToken(
      user._id,
      user.role
    );

    res.status(200).json({
      success: true,

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req,
  res
) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            department,
            role,
        } = req.body;

        const userExists = await User.findOne({
            email,
        });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            department,
            role,
        });

        res.status(201).json({
            success: true,
            user,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};