// routes/document.routes.js

import express from "express";
import upload from "../middleware/upload.middleware.mjs";
import devAuthMiddleware from "../middleware/dev.auth.middleware.mjs";
import {
  uploadDocument,
  //   getDocumentById,
  //   getUserDocuments,
} from "../controller/document.controller.mjs";

const router = express.Router();

router.post(
  "/upload",
  devAuthMiddleware,
  upload.single("file"),
  uploadDocument,
); /*

// Get all documents of user
router.get("/", getUserDocuments);

// Get single document
router.get("/:id", getDocumentById);
*/
export default router;
