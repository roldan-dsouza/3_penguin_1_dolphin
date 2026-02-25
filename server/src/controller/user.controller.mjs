import userModel from "../model/user.model.mjs";
import { validateRequest } from "../util/validate.request.util.mjs";

export const getUserProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await userModel.findById(id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

export const saveOnboarding = async (req, res) => {
  const { strugglesWithWhite, prefersLargeText, readingMode } = req.body;
  if (
    strugglesWithWhite === undefined ||
    prefersLargeText === undefined ||
    !readingMode
  ) {
    return res
      .status(400)
      .json({ message: "All settings fields are required" });
  }
  const onboardingSettings = {
    strugglesWithWhite,
    prefersLargeText,
    readingMode,
  };
  const newOnboardingSettings = new userModel(onboardingSettings);
  await newOnboardingSettings
    .save()
    .then(() => {
      res.status(200).json({ message: "Settings saved successfully" });
    })
    .catch((err) => {
      console.error("Error saving settings:", err);
      res.status(500).json({ message: "Failed to save settings" });
    });
};
/*settings: {
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
  }*/

export const updateSettings = async (req, res) => {
  try {
    const userId = req.user.id; // assuming auth middleware

    // Remove undefined fields (so we only update what was sent)
    const updates = {};
    const allowedFields = [
      "font",
      "fontSize",
      "lineSpacing",
      "wordSpacing",
      "background",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const updatedSettings = await userModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Settings updated successfully",
      settings: updatedSettings,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
