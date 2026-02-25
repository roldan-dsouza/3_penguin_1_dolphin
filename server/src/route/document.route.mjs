// routes/document.routes.js

import express from "express";
import devAuthMiddleware from "../middleware/dev_auth.middleware.mjs";
import {
  uploadDocument,
  getDocumentById,
  getUserDocuments,
} from "../controllers/document.controller.js";

const router = express.Router();

router.use(devAuthMiddleware);

// Upload PDF
router.post("/upload", uploadDocument);

// Get all documents of user
router.get("/", getUserDocuments);

// Get single document
router.get("/:id", getDocumentById);

export default router;
