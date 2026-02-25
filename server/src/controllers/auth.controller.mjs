import userModel from "../model/user.model.mjs";
const usermails = ["aadmin@gmail.com", "austin@gmail.com"];

export const login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (usermails.includes(email) && password == "password") {
    res.status(200).json({ message: "Login successful" });
  } else {
    console.log(err, "error");
    res.status(401).json({ message: "Invalid email or password" });
  }
};
/*prefersLargeText: Boolean,
      strugglesWithWhite: Boolean,
      readingMode: {
        type: String,
        enum: ["line", "paragraph", "normal"],
      },*/

export const addOnboarding = (req, res) => {
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
  newOnboardingSettings
    .save()
    .then(() => {
      res.status(200).json({ message: "Settings saved successfully" });
    })
    .catch((err) => {
      console.error("Error saving settings:", err);
      res.status(500).json({ message: "Failed to save settings" });
    });
};
