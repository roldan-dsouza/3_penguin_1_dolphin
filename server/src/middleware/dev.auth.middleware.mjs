import User from "../model/user.model.mjs";

export default async function devAuthMiddleware(req, res, next) {
  try {
    // Get first user in DB
    const user = await User.findOne();

    if (!user) {
      return res.status(404).json({ message: "No users in DB" });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: "Dev auth failed" });
  }
}
