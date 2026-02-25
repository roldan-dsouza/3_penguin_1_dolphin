import mongoose from "mongoose";

/**
 * Temporary development auth middleware
 * DO NOT USE IN PRODUCTION
 */
export default function devAuthMiddleware(req, res, next) {
  req.user = {
    id: new mongoose.Types.ObjectId("699ee3abe6a4ad5f1d99e349"),
  };

  next();
}
