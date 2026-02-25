// routes/word.routes.js

import express from "express";
import devAuthMiddleware from "../middleware/dev.auth.middleware.mjs";

const router = express.Router();

router.use(devAuthMiddleware);

//router.post("/meaning", getWordMeaning);

export default router;
