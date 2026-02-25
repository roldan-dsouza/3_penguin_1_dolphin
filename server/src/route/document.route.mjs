// routes/document.routes.js

import express from "express";
import devAuthMiddleware from "../middleware/dev.auth.middleware.mjs";
// import {
//   uploadDocument,
//   getDocumentById,
//   getUserDocuments,
// } from "../controller/document.controller.mjs";

const router = express.Router();

router.use(devAuthMiddleware);
/*
// Upload PDF
router.post("/upload", uploadDocument);

// Get all documents of user
router.get("/", getUserDocuments);

// Get single document
router.get("/:id", getDocumentById);
*/
export default router;
