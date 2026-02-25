// models/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    onboarding: {
      prefersLargeText: { type: Boolean, default: true },
      strugglesWithWhite: { type: Boolean, default: true },
      readingMode: {
        type: String,
        enum: ["line", "paragraph", "normal"],
        default: "line",
      },
    },

    settings: {
      font: {
        type: String,
        default: "OpenDyslexic",
      },
      fontSize: {
        type: Number,
        default: 16,
      },
      lineSpacing: {
        type: Number,
        default: 1.6,
      },
      wordSpacing: {
        type: Number,
        default: 2,
      },
      background: {
        type: String,
        default: "cream",
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
