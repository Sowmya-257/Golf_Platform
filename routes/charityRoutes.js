import express from "express";
import {
  addCharity,
  getCharities,
  selectCharity
} from "../controllers/charityController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getCharities);

// USER
router.post("/select", protect, selectCharity);

// ADMIN
router.post("/add", protect, adminOnly, addCharity);

export default router;