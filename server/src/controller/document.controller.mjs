// server/src/controller/document.controller.mjs

import { createDocument } from "../service/document.service.mjs";

export const uploadDocument = async (req, res) => {
  try {
    console.log("UPLOAD ROUTE HIT");
    console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "File not received" });
    }

    const document = await createDocument(req.file, req.user._id);

    res.status(201).json({
      message: "Document uploaded successfully",
      documentId: document._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
