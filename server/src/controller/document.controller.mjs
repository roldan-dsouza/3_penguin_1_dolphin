import { createDocument } from "../service/document.service.mjs";

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
