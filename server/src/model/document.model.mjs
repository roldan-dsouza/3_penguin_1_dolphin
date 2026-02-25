// models/document.model.js

import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
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

    simplifiedContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Document", documentSchema);
