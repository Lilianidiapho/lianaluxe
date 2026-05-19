import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let dburl = process.env.DBURL;
if (dburl && dburl.startsWith('"') && dburl.endsWith('"')) {
  dburl = dburl.slice(1, -1);
}

export default function connectDb() {
  try {
    mongoose.connect(dburl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}
