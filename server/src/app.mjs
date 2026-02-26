// server/src/app.mjs
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./route/user.route.mjs";
//import documentRoutes from "./route/document.route.mjs";
//import progressRoutes from "./route/progress.route.mjs";
import wordRoutes from "./route/word.route.mjs";
import authRoutes from "./routes/auth.routes.mjs";
//import simplifyRoutes from "./routes/simplify.routes.mjs";
import cors from "cors";

dotenv.config();

// import morgan from "morgan";

const app = express();

// const corsOptions = {
//   origin: [process.env.FRONTEND_DOMAIN, "*"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// };
// console.log("CORS Origins:", process.env.FRONTEND_DOMAIN);
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
// app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
//app.use("/api/document", documentRoutes);
//app.use("/api/progress", progressRoutes);
app.use("/api/word", wordRoutes);
app.use("/api/auth", authRoutes);
//app.use("/api/simplify", simplifyRoutes);

// Test route
app.get("/try", (req, res) => {
  res.json({ message: "ReadEase API is running" });
});

export default app;
