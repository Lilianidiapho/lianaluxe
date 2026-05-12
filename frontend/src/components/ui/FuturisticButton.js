"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FuturisticButton({ children, onClick, className, variant = "primary" }) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden px-8 py-3 rounded-full font-display font-bold uppercase tracking-widest text-sm transition-all duration-300",
        isPrimary
          ? "bg-neon-primary text-black shadow-[0_0_20px_rgba(0,255,204,0.4)] hover:shadow-[0_0_30px_rgba(0,255,204,0.6)]"
          : "glass-panel text-white hover:border-neon-primary hover:text-neon-primary hover:shadow-[0_0_15px_rgba(0,255,204,0.2)]",
        className
      )}
    >
      {/* Glitch/Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{
          opacity: [0, 0.5, 0],
          x: ["-100%", "100%"],
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
