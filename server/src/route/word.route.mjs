// routes/word.routes.js

import express from "express";
import devAuthMiddleware from "../middleware/dev_auth.middleware.mjs";
import { getWordMeaning } from "../controllers/word.controller.js";

const router = express.Router();

router.use(devAuthMiddleware);

router.post("/meaning", getWordMeaning);

export default router;
