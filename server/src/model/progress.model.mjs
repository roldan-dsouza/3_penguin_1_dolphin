// models/progress.model.js

import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },

    scrollPosition: Number,
  },
  { timestamps: true },
);

export default mongoose.model("ReadingProgress", progressSchema);
