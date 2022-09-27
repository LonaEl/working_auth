import dotenv from "dotenv";
dotenv.config();

//config({ path: "./config.env" });
import express from "express";
const app = express();
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";

connectDB();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Api running");
});

import authRoute from "./routes/auth.js";
import privateRoute from "./routes/private.js"


// Connecting Routes
app.use("/api/auth", authRoute);
app.use("/api/private", privateRoute);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
