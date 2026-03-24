import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  scores: [
    {
      value: {
        type: Number,
        min: 1,
        max: 45
      },
      date: {
        type: Date,
        required: true
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Score", scoreSchema);