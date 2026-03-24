import Winner from "../models/Winner.js";

// 📤 Upload Proof (USER)
export const uploadProof = async (req, res) => {
  const { winnerId, proofUrl } = req.body;

  try {
    const winner = await Winner.findById(winnerId);

    if (!winner) {
      return res.status(404).json({
        success: false,
        message: "Winner not found"
      });
    }

    // only owner can upload
    if (winner.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    winner.proof = proofUrl;
    winner.status = "pending";

    await winner.save();

    res.json({
      success: true,
      message: "Proof uploaded successfully 📤"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading proof",
      error: error.message
    });
  }
};


// ✅ Approve / Reject (ADMIN)
export const verifyWinner = async (req, res) => {
  const { winnerId, status } = req.body;

  try {
    const winner = await Winner.findById(winnerId);

    if (!winner) {
      return res.status(404).json({
        success: false,
        message: "Winner not found"
      });
    }

    if (!["approved", "rejected", "paid"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    winner.status = status;
    await winner.save();

    res.json({
      success: true,
      message: `Winner ${status} successfully `
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying winner",
      error: error.message
    });
  }
};