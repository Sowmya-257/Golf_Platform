import stripe from "../config/stripe.js";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";

export const createSubscription = async (req, res) => {
  const { plan } = req.body;

  try {
    const price = plan === "monthly" ? 500 : 5000; // example ₹

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Golf Subscription (${plan})`
            },
            unit_amount: price * 100
          },
          quantity: 1
        }
      ],

      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`
    });

    // store pending subscription
    await Subscription.create({
      user: req.user._id,
      plan,
      amount: price,
      stripeSessionId: session.id
    });

    console.log("REQ USER:", req.user);

    res.json({
      success: true,
      url: session.url
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Stripe error",
      error: error.message
    });
  }
};

export const confirmSubscription = async (req, res) => {
  const { session_id } = req.query;

  try {
    const subscription = await Subscription.findOne({
      stripeSessionId: session_id
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const startDate = new Date();

    const endDate = new Date();
    if (subscription.plan === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    subscription.status = "active";
    subscription.startDate = startDate;
    subscription.endDate = endDate;

    await subscription.save();

    // update user
    await User.findByIdAndUpdate(subscription.user, {
      subscriptionStatus: "active",
      subscriptionEndDate: endDate
    });

    res.json({
      success: true,
      message: "Subscription activated 🎉"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error confirming subscription",
      error: error.message
    });
  }
};