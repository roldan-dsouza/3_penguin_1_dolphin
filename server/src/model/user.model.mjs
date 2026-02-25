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
      prefersLargeText: { type: Boolean, default: false },
      strugglesWithWhite: { type: Boolean, default: false },
      readingMode: {
        type: String,
        enum: ["line", "paragraph", "normal"],
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
