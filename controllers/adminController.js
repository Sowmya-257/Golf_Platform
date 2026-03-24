import User from "../models/User.js";
import Winner from "../models/Winner.js";

// 👥 Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};


// 🏆 Get All Winners
export const getAllWinners = async (req, res) => {
  try {
    const winners = await Winner.find()
      .populate("user", "name email")
      .populate("draw");

    res.json({
      success: true,
      data: winners
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching winners",
      error: error.message
    });
  }
};