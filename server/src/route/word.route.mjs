// routes/word.routes.js

import express from "express";
import devAuthMiddleware from "../middleware/dev.auth.middleware.mjs";
import { simplifyHtmlForDyslexia } from "../controller/word.controller.mjs";

const router = express.Router();

router.use(devAuthMiddleware);

//router.post("/meaning", getWordMeaning);
router.get("/enhanced", simplifyHtmlForDyslexia);

export default router;
