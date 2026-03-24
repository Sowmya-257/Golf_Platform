import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  month: String,

  numbers: [Number], // 5 numbers

  type: {
    type: String,
    enum: ["random", "algorithm"],
    default: "random"
  },

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Draw", drawSchema);