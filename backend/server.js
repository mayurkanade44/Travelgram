import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
dotenv.config();

import userRouter from "./routes/userRoute.js";
import travelRouter from "./routes/travelRoute.js";

import { authenticateUser } from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/user", userRouter);
app.use("/api/travel", authenticateUser, travelRouter);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, console.log("Server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
