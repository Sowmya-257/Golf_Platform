import Charity from "../models/Charity.js";
import User from "../models/User.js";

//  Add Charity (ADMIN)
export const addCharity = async (req, res) => {
  const { name, description, image } = req.body;

  try {
    const charity = await Charity.create({
      name,
      description,
      image,
      totalDonations: 0
    });

    res.status(201).json({
      success: true,
      message: "Charity added successfully ",
      data: charity
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding charity",
      error: error.message
    });
  }
};


//  Get All Charities
export const getCharities = async (req, res) => {
  try {
    const charities = await Charity.find();

    res.json({
      success: true,
      data: charities
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching charities",
      error: error.message
    });
  }
};


//  Select Charity (USER)
export const selectCharity = async (req, res) => {
  const { charityId, percentage } = req.body;

  try {
    const charity = await Charity.findById(charityId);
    if (!charity) {
      return res.status(404).json({
        success: false,
        message: "Charity not found"
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      charity: charityId,
      charityPercentage: percentage || 10
    });

    res.json({
      success: true,
      message: "Charity selected "
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error selecting charity",
      error: error.message
    });
  }
};