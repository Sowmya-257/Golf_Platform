import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  plan: {
    type: String,
    enum: ["monthly", "yearly"]
  },
  amount: Number,

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  },

  startDate: Date,
  endDate: Date,

  stripeSessionId: String

}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);