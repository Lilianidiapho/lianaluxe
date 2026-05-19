import Video from "../models/video.js";
import { v2 as cloudinary } from "cloudinary";

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Server error fetching videos" });
  }
};

export const addVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    const video = new Video({
      title: title || "Untitled Video",
      url: file.path,
      public_id: file.filename,
    });

    await video.save();
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ message: "Server error adding video" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete from Cloudinary
    if (video.public_id) {
      await cloudinary.uploader.destroy(video.public_id, { resource_type: "video" });
    }

    await video.deleteOne();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Server error deleting video" });
  }
};
