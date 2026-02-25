import userModel from "../model/user.model.mjs";
usermails = ["aadmin@gmail.com", "austin@gmail.com"];

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (email in usermails && password == "password") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
/*prefersLargeText: Boolean,
      strugglesWithWhite: Boolean,
      readingMode: {
        type: String,
        enum: ["line", "paragraph", "normal"],
      },*/
