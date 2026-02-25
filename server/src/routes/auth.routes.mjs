import { Router } from "express";
import { addOnboarding, login } from "../controllers/auth.controller.mjs";
const router = Router();

router.post("/login", login);
router.post("/onboarding", addOnboarding);

export default router;
