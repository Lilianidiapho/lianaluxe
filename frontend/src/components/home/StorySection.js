"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function StorySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="py-32 px-6 lg:px-16 overflow-hidden relative min-h-screen flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Images Parallax */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          <motion.div 
            style={{ y: y1 }}
            className="absolute left-0 top-10 w-[60%] h-[70%] rounded-2xl overflow-hidden glass-panel z-10"
          >
            <Image 
              src="/perf.jpg" 
              alt="Story 1" 
              fill 
              className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-110"
            />
          </motion.div>
          <motion.div 
            style={{ y: y2 }}
            className="absolute right-0 bottom-10 w-[55%] h-[60%] rounded-2xl overflow-hidden glass-panel z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <Image 
              src="/luxeries .jpeg" 
              alt="Story 2" 
              fill 
              className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-110"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div 
          style={{ scale }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            BEYOND <br/>
            <span className="text-neon-secondary text-glow-secondary">THE ORDINARY</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Every essence is carefully curated to transcend the boundaries of physical reality. Step into a world where premium quality meets futuristic design. It's not just shopping; it's an immersive journey into the self.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center flex-shrink-0 text-neon-primary">
                01
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">Ethereal Quality</h3>
                <p className="text-gray-500">Crafted with the finest ingredients across the globe.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center flex-shrink-0 text-neon-secondary">
                02
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">Web3 Integrated</h3>
                <p className="text-gray-500">Digital ownership and exclusive community access.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
