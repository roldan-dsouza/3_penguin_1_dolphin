import { createDocument } from "../services/document.service.js";

export const uploadDocument = async (req, res) => {
  try {
    const document = await createDocument(req.file, req.user._id);

    res.status(201).json({
      message: "Document uploaded successfully",
      documentId: document._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
