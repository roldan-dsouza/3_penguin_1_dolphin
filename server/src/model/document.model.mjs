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

    simplifiedContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Document", documentSchema);
