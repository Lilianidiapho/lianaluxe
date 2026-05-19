"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/home/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function StoryPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get("https://lianaluxe-backend.onrender.com/videos");
        setVideos(data.videos || []);
      } catch (error) {
        console.error("Failed to fetch story videos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <main className="bg-bg-base min-h-screen text-white pt-24">
      <Navbar />
      
      <section className="px-6 lg:px-16 py-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4">
            EXPLORE <span className="text-neon-primary text-glow">STORY</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            Immerse yourself in the world of Liana Luxe. Discover our cinematic campaigns, behind-the-scenes moments, and visual stories.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-32 text-neon-primary">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-32 text-gray-500 font-sans text-xl border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
            Check back soon for new stories.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {videos.map((vid, i) => (
              <motion.div
                key={vid._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10"
              >
                <div className="w-full aspect-video bg-black/50">
                  <video 
                    src={vid.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-display font-bold text-white shadow-sm">
                    {vid.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
