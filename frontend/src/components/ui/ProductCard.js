"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";

export default function ProductCard({ id, title, price, image, category, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const { addToCart } = useCart();

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={`/product/${id}`}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "group relative flex flex-col h-[400px] w-full rounded-2xl p-4 cursor-pointer glass-panel transition-colors duration-500 hover:border-neon-primary overflow-hidden",
          className
        )}
      >
        {/* Glow effect behind image */}
        <div className="absolute inset-0 bg-neon-primary opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500 rounded-full scale-150 transform -translate-y-10" />

        <div 
          className="relative flex-1 w-full rounded-xl overflow-hidden mb-4 bg-black/20 backdrop-blur-sm flex items-center justify-center"
          style={{ transform: "translateZ(30px)" }}
        >
          <motion.div
             className="w-full h-full relative"
             whileHover={{ scale: 1.1 }}
             transition={{ duration: 0.5 }}
          >
             <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700"
             />
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col gap-1" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-lg font-display font-semibold text-white group-hover:text-neon-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-sans text-white/80">₦{price}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full glass-panel hover:bg-neon-primary hover:text-black hover:border-neon-primary transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                addToCart({ id, title, price, image, category });
              }}
            >
              <ShoppingCart size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
