import express from "express";
import {
  createSubscription,
  confirmSubscription
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createSubscription);
router.get("/confirm", confirmSubscription);

export default router;