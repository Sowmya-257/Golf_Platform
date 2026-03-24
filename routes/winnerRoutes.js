import express from "express";
import {
  uploadProof,
  verifyWinner
} from "../controllers/winnerController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// USER
router.post("/upload-proof", protect, uploadProof);

// ADMIN
router.post("/verify", protect, adminOnly, verifyWinner);

export default router;