// models/document.model.js

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

    originalFileUrl: String,

    originalContent: {
      type: String,
      required: true,
    },

    simplifiedContent: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Document", documentSchema);
