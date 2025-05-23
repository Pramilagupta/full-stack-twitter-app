import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";

dotenv.config();
// app.use(cors({ origin: process.env.PORT, credentials: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

// console.log(process.env.MONGO_URI);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://full-stack-twitter-app.vercel.app",
    ],
  })
);
// middlewares
app.use(express.json({ limit: "5mb" })); // to parse req.body
//  limit shouln't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); //to parse from data(urlencoded)

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Hello from backend server");
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
  connectMongoDB();
});

export default app;
