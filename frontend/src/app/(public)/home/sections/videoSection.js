"use client";
import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

export default function VideoSection() {
  const videoRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [mutedVideos, setMutedVideos] = useState({});

  const videos = [
    "/everyday luxeries mist.mp4",
    "/bigsmall candle .mp4",
    "/small candle .mp4",
  ];

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
      }
    });

    const selectedVideo = videoRefs.current[index];

    if (selectedVideo.paused) {
      selectedVideo.play();
      setPlayingIndex(index);
    } else {
      selectedVideo.pause();
      setPlayingIndex(null);
    }
  };

  const toggleMute = (index) => {
    const video = videoRefs.current[index];
    video.muted = !video.muted;

    setMutedVideos((prev) => ({
      ...prev,
      [index]: video.muted,
    }));
  };
return (
  <section className="bg-gray-200 py-20 px-6">
    
    {/* Section Header */}
    <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold ">PRODUCT VIDEOS</h2>
 
    </div>

    {/* Videos Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {videos.map((src, index) => (
        <div
          key={index}
          className=" relative aspect-video overflow-hidden bg-black "
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={src}
            className="w-full h-full object-contain bg-black"
            muted
          />

          {/* Play Button */}
          {playingIndex !== index && (
            <button
              onClick={() => handlePlay(index)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-pink-600 p-5 rounded-full">
                <Play className="text-white w-8 h-8" />
              </div>
            </button>
          )}

          {/* Mute Button */}
          <button
            onClick={() => toggleMute(index)}
            className="absolute bottom-4 right-4 bg-black/70 p-3 rounded-full"
          >
            {mutedVideos[index] ? (
              <VolumeX className="text-white w-5 h-5" />
            ) : (
              <Volume2 className="text-white w-5 h-5" />
            )}
          </button>
        </div>
      ))}
    </div>
  </section>
);
}