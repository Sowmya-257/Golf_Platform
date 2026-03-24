import express from "express";
import {
  getAllUsers,
  getAllWinners
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/winners", protect, adminOnly, getAllWinners);

export default router;