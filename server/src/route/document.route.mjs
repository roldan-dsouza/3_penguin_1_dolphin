// routes/document.routes.js

import express from "express";
import upload from "../middleware/upload.middleware.mjs";
import devAuthMiddleware from "../middleware/dev.auth.middleware.mjs";
import { uploadDocument } from "../controller/document.controller.mjs";

const router = express.Router();

router.post(
  "/upload",
  //devAuthMiddleware,
  upload.single("file"),
  uploadDocument,
);

export default router;
