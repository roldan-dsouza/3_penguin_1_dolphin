// server.mjs

import dotenv from "dotenv";
import app from "./src/app.mjs";
import connectDB from "./src/config/db.config.mjs";

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB()
  .then(() => {
    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    // Log any errors during DB connection
    console.error("Failed to connect to the database:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
