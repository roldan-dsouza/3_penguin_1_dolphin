// route/document.route.mjs
console.log("DOCUMENT ROUTE FILE LOADED");
import express from "express";
import upload from "../middleware/upload.middleware.mjs";
import devAuthMiddleware from "../middleware/dev.auth.middleware.mjs";
import { uploadDocument } from "../controller/document.controller.mjs";

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  devAuthMiddleware,
  uploadDocument,
);

export default router;
