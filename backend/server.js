//import packages,
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./src/config/db.js";
import productRoutes from "./src/routes/product-routes.js";
import authRoutes from "./src/routes/auth-routes.js";
import videoRoutes from "./src/routes/video-routes.js";
import { fileURLToPath } from "url";
import path from "path";

//configure env
dotenv.config();

//Database connection
connectDb();

//setup variables
const server = express();
const port = process.env.PORT || 5000;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//setup middlewares
server.use(express.json());
server.use(cors());
server.use("/api/auth", authRoutes);
server.use("/", productRoutes);
server.use("/videos", videoRoutes);
server.use("/uploads", express.static(path.join(dirname, "uploads")));

//server

server.listen(port, "0.0.0.0", () =>
  console.log(`Server listening at http://0.0.0.0:${port}`),
);
