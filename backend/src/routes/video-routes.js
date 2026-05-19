import express from "express";
import { getVideos, addVideo, deleteVideo } from "../controllers/video-controller.js";
import videoUpload from "../middlewares/video-upload.js";

const router = express.Router();

router.get("/", getVideos);
router.post("/", videoUpload.single("video"), addVideo);
router.delete("/:id", deleteVideo);

export default router;
