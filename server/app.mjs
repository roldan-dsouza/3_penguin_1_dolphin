// server/src/app.mjs

import express from "express";
import userRoutes from "./routes/user.routes.js";
import documentRoutes from "./routes/document.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import wordRoutes from "./routes/word.routes.js";

dotenv.config();
// import cors from "cors";
// import morgan from "morgan";

const app = express();

/*const corsOptions = {
  origin: [process.env.FRONTEND_DOMAIN, "*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
console.log("CORS Origins:", process.env.FRONTEND_DOMAIN);

// Middleware
app.use(cors(corsOptions));*/
// app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/word", wordRoutes);

// Test route
app.get("/try", (req, res) => {
  res.json({ message: "ReadEase API is running" });
});

export default app;
