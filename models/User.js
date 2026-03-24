import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  subscriptionStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  },

  subscriptionEndDate: Date,

  charityPercentage: {
    type: Number,
    default: 10
  },

  totalWinnings: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);