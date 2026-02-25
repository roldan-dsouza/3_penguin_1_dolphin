import userModel from "../model/user.model.mjs";

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
