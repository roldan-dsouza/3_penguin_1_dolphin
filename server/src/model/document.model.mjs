// model/document.model.mjs

import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    originalFileUrl: {
      type: String,
    },
    originalContent: {
      type: String,
      required: true,
    },
    // Changed: removed required: true so you can save
    // the document while the AI is still "thinking"
    simplifiedContent: {
      type: String,
    },
  },
  { timestamps: true },
);

// Prevent re-compilation error if hot-reloading
const Document =
  mongoose.models.Document || mongoose.model("Document", documentSchema);
export default Document;
