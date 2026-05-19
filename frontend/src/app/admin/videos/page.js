"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Video, Plus, Loader2 } from "lucide-react";
import FuturisticButton from "@/components/ui/FuturisticButton";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get("https://lianaluxe-backend.onrender.com/videos");
      setVideos(data.videos || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title || "Untitled Video");

    try {
      await axios.post("https://lianaluxe-backend.onrender.com/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      setTitle("");
      fetchVideos();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload video");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`https://lianaluxe-backend.onrender.com/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete video");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-black text-white tracking-tighter">
          MANAGE <span className="text-neon-primary">VIDEOS</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-black/40 border border-white/5 rounded-xl p-6 relative overflow-hidden">
            <h2 className="text-xl font-display font-bold text-white mb-6">Add New Video</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wider">
                  Video Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary transition-colors"
                  placeholder="e.g. New Collection Teaser"
                />
              </div>
              
              <div>
                <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wider">
                  Video File (MP4, MOV)
                </label>
                <div className="w-full relative border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-neon-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Video className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-400 font-sans">
                      {file ? file.name : "Click or drag video here"}
                    </span>
                  </div>
                </div>
              </div>

              <FuturisticButton 
                type="submit" 
                variant="primary" 
                className="w-full flex justify-center mt-6"
                disabled={uploading}
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Upload Video
                  </span>
                )}
              </FuturisticButton>
            </form>
          </div>
        </div>

        {/* Video Gallery */}
        <div className="lg:col-span-2">
          <div className="bg-black/40 border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-display font-bold text-white mb-6">Gallery</h2>
            
            {loading ? (
              <div className="flex justify-center py-20 text-neon-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-20 text-gray-500 font-sans">
                No videos uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((vid) => (
                  <div key={vid._id} className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5">
                    <video 
                      src={vid.url} 
                      className="w-full aspect-video object-cover"
                      controls
                    />
                    <div className="p-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-t border-white/5">
                      <span className="text-sm font-sans font-medium text-white truncate pr-4">
                        {vid.title}
                      </span>
                      <button
                        onClick={() => handleDelete(vid._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Video"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
