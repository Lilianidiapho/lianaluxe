import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dburl = process.env.DBURL;

export default function connectDb() {
  try {
    mongoose.connect(dburl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}
