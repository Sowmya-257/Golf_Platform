import express from "express";
import { addScore, getScores } from "../controllers/scoreController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addScore);
router.get("/", protect, getScores);

export default router;