import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
// 1. Import the monitoring tool
import { register, collectDefaultMetrics } from "prom-client";

import authRoutes from "./routes/auth.route.js";
import searchRoutes from "./routes/search.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

// 2. Initialize default metrics collection (CPU, Memory, etc.)
collectDefaultMetrics({ register });

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// 3. Expose the /metrics endpoint for Prometheus to scrape
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.send(await register.metrics());
  } catch (err) {
    res.status(500).send(err);
  }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

if (process.env.NODE_ENV === "production") {
  const pathToFrontend = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(pathToFrontend));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(pathToFrontend, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

startServer();
