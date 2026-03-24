import express from "express";
import { runDraw } from "../controllers/drawController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/run", protect, adminOnly, runDraw);

export default router;