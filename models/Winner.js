// import mongoose from "mongoose";

// const winnerSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },

//   draw: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Draw"
//   },

//   matchType: String, // "3", "4", "5"

//   amount: Number,

//   status: {
//     type: String,
//     enum: ["pending", "approved"],
//     default: "pending"
//   }

// }, { timestamps: true });

// export default mongoose.model("Winner", winnerSchema);






import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    draw: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw"
    },

    matchType: {
      type: String // "3", "4", "5"
    },

    amount: Number,

    proof: {
      type: String // image URL
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "paid"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Winner", winnerSchema);