// models/progress.model.js

import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    scrollPosition: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ReadingProgress", progressSchema);
