// routes/progress.routes.js

import express from "express";
import devAuthMiddleware from "../middleware/dev_auth.middleware.mjs";
import {
  saveProgress,
  getProgress,
} from "../controllers/progress.controller.js";

const router = express.Router();

router.use(devAuthMiddleware);

// Save reading progress
router.post("/save", saveProgress);

// Get reading progress
router.get("/:documentId", getProgress);

export default router;
