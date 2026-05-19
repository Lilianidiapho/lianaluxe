"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-bg-base min-h-screen text-white pt-24">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent z-10" />
          <img 
            src="/perf.jpg" 
            alt="Liana Luxe About" 
            className="w-full h-full object-cover opacity-40 blur-sm"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6"
          >
            OUR <span className="text-neon-primary text-glow">STORY</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 font-sans max-w-2xl mx-auto"
          >
            Discover the passion, vision, and dedication behind Liana Luxe, where luxury meets the modern era of self-care.
          </motion.p>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="px-6 lg:px-16 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
              THE <span className="text-neon-primary">BEGINNING</span>
            </h2>
            <div className="space-y-4 font-sans text-gray-400 leading-relaxed text-lg">
              <p>
                Liana Luxe was founded with a singular vision: to redefine luxury for the modern consumer. What started as a small passion project quickly grew into a celebrated brand known for exceptional quality and immersive experiences.
              </p>
              <p>
                [Placeholder Text: You can edit this later to tell your exact founding story. Describe the inspiration that led to the creation of your first product, the challenges you overcame, and the core values that have remained unchanged since day one.]
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden glass-panel"
          >
            <img 
              src="/mist.webp" 
              alt="Liana Luxe Origins" 
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="px-6 lg:px-16 py-20 max-w-7xl mx-auto bg-white/5 rounded-3xl mb-20 border border-white/10 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 relative h-[500px] w-full rounded-2xl overflow-hidden glass-panel"
          >
            <img 
              src="/mist.webp" 
              alt="Liana Luxe Vision" 
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
              OUR <span className="text-neon-primary">VISION</span>
            </h2>
            <div className="space-y-4 font-sans text-gray-400 leading-relaxed text-lg">
              <p>
                We believe that self-care is not a luxury, but a necessity. Our mission is to provide you with products that not only enhance your physical well-being but also elevate your spirit.
              </p>
              <p>
                [Placeholder Text: Use this section to talk about your future goals, your commitment to sustainability, or the unique ingredients that make your products stand out in the beauty and wellness industry.]
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
