import Score from "../models/Score.js";

// Add Score
export const addScore = async (req, res) => {
  const { value, date } = req.body;

  try {
    let scoreDoc = await Score.findOne({ user: req.user._id });

    // if no document exists → create
    if (!scoreDoc) {
      scoreDoc = await Score.create({
        user: req.user._id,
        scores: [{ value, date }]
      });
    } else {
      // maintain max 5 scores
      if (scoreDoc.scores.length >= 5) {
        scoreDoc.scores.shift(); // remove oldest
      }

      scoreDoc.scores.push({ value, date });
      await scoreDoc.save();
    }

    res.status(200).json({
      success: true,
      message: "Score added successfully ",
      data: scoreDoc.scores.reverse() // latest first
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding score",
      error: error.message
    });
  }
};


// 📥 Get Scores
export const getScores = async (req, res) => {
  try {
    const scoreDoc = await Score.findOne({ user: req.user._id });

    if (!scoreDoc) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    res.status(200).json({
      success: true,
      data: scoreDoc.scores.reverse()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching scores",
      error: error.message
    });
  }
};