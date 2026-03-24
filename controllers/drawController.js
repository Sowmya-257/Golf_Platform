import Draw from "../models/Draw.js";
import Score from "../models/Score.js";
import Winner from "../models/Winner.js";
import User from "../models/User.js";

//  Run Draw (FINAL VERSION)
export const runDraw = async (req, res) => {
  try {
    //  Generate numbers
    // const numbers = Array.from({ length: 5 }, () =>
    //   Math.floor(Math.random() * 45) + 1
    // );
    const numbers = [7, 14, 18, 31, 16];

    const month = new Date().toISOString().slice(0, 7);

    const draw = await Draw.create({
      month,
      numbers,
      status: "completed"
    });

    // ✅ Only ACTIVE users
    const activeUsers = await User.find({
      subscriptionStatus: "active"
    });

    let winners3 = [];
    let winners4 = [];
    let winners5 = [];

    for (let user of activeUsers) {
      const scoreDoc = await Score.findOne({ user: user._id });

      if (!scoreDoc) continue;

      const userScores = scoreDoc.scores.map(s => s.value);

      const matches = userScores.filter(num =>
        numbers.includes(num)
      ).length;

      if (matches === 3) winners3.push(user);
      if (matches === 4) winners4.push(user);
      if (matches === 5) winners5.push(user);
    }

    // 💰 Prize Pool (example logic)
    const totalSubscribers = activeUsers.length;
    const subscriptionAmount = 500;

    const totalPool = totalSubscribers * subscriptionAmount;

    const pool = {
      match5: totalPool * 0.4,
      match4: totalPool * 0.35,
      match3: totalPool * 0.25
    };

    // 💸 Distribute prizes
    const distribute = async (users, matchType, amount) => {
      if (users.length === 0) return;

      const perUser = amount / users.length;

      for (let user of users) {
        await Winner.create({
          user: user._id,
          draw: draw._id,
          matchType,
          amount: perUser
        });

        // update user winnings
        user.totalWinnings += perUser;
        await user.save();
      }
    };

    await distribute(winners5, "5", pool.match5);
    await distribute(winners4, "4", pool.match4);
    await distribute(winners3, "3", pool.match3);

    res.json({
      success: true,
      message: "Draw completed with prizes 🎉",
      numbers,
      stats: {
        totalSubscribers,
        winners5: winners5.length,
        winners4: winners4.length,
        winners3: winners3.length
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error running draw",
      error: error.message
    });
  }
};