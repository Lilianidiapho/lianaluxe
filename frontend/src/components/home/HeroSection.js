"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import FuturisticButton from "@/components/ui/FuturisticButton";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100 blur-[2px] scale-105"
        >
          <source src="/bigsmall candle .mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-bg-base" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-4 inline-block px-4 py-1 rounded-full border border-neon-primary/10 bg-neon-primary/10 text-neon-primary text-sm font-sans tracking-widest uppercase"
        >
          Welcome to the Future of Commerce
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-display font-black text-white leading-tight mb-6 tracking-tighter"
        >
          IMMERSE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary text-glow">
            YOUR SENSES
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-gray-400 font-sans max-w-2xl mx-auto mb-10"
        >
          Discover curated collections of premium fragrances and luxuries. A cinematic shopping experience designed for the modern era.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <FuturisticButton variant="primary">Shop Collection</FuturisticButton>
          <FuturisticButton variant="glass">Explore Story</FuturisticButton>
        </motion.div>
      </motion.div>

      {/* Floating Elements Parallax */}
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-10 md:left-32 hidden md:block"
      >
        <div className="w-32 h-32 rounded-full bg-neon-primary/20 blur-[50px]" />
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        className="absolute top-40 right-10 md:right-32 hidden md:block"
      >
        <div className="w-48 h-48 rounded-full bg-neon-secondary/20 blur-[60px]" />
      </motion.div>
    </section>
  );
}
