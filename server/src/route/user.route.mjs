// routes/user.routes.js

import express from "express";
import devAuthMiddleware from "../middleware/dev_auth.middleware.mjs";
import {
  getUserProfile,
  saveOnboarding,
  updateSettings,
} from "../controllers/user.controller.js";

const router = express.Router();

// All routes protected
router.use(devAuthMiddleware);

// Get current user profile
router.get("/me", getUserProfile);

// Save onboarding answers
router.post("/onboarding", saveOnboarding);

// Update reading settings
router.put("/settings", updateSettings);

export default router;
