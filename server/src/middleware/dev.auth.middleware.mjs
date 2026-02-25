import mongoose from "mongoose";

/**
 * Temporary development auth middleware
 * DO NOT USE IN PRODUCTION
 */
export default function devAuthMiddleware(req, res, next) {
  req.user = {
    id: new mongoose.Types.ObjectId("66a111111111111111111111"),
  };

  next();
}
