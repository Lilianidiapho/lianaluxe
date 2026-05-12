"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/home/Footer";
import FuturisticButton from "@/components/ui/FuturisticButton";
import { Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "@/providers/CartProvider";

export default function ProductDetail({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`http://127.0.0.1:5000/product/${id}`);
        if (data.product) {
          const p = data.product;
          setProduct({
            id: p._id,
            title: p.name,
            price: p.price.toString(),
            category: p.category,
            description: p.description || "An exceptional piece from our exclusive collection. Crafted with the finest materials for a truly immersive experience.",
            image: p.images && p.images[0] 
              ? (p.images[0].startsWith("/uploads") ? `http://127.0.0.1:5000${p.images[0]}` : p.images[0]) 
              : "/perf.jpg"
          });
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-bg-base min-h-screen text-white pt-24 overflow-hidden flex items-center justify-center">
        <Navbar />
        <div className="text-xl text-neon-primary">Loading Product...</div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="bg-bg-base min-h-screen text-white pt-24 overflow-hidden flex items-center justify-center">
        <Navbar />
        <div className="text-xl text-red-500">Product not found.</div>
      </main>
    );
  }

  return (
    <main className="bg-bg-base min-h-screen text-white pt-24 overflow-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-primary transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery / 3D Display area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[700px] rounded-3xl glass-panel p-8 flex items-center justify-center overflow-hidden group"
          >
            {/* Animated Glow */}
            <div className="absolute inset-0 bg-neon-primary/5 opacity-50 group-hover:bg-neon-primary/10 group-hover:scale-110 transition-all duration-700 rounded-full blur-[100px]" />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full h-full"
            >
              <Image 
                src={product.image} 
                alt={product.title}
                fill
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-2 text-neon-secondary font-sans font-semibold tracking-widest uppercase text-sm">
              {product.category}
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold tracking-tighter mb-6 text-white">
              {product.title}
            </h1>
            <div className="text-3xl font-sans mb-8">₦{product.price}</div>
            
            <div className="flex items-center gap-2 mb-8 text-yellow-400">
              <Star className="fill-current w-5 h-5" />
              <Star className="fill-current w-5 h-5" />
              <Star className="fill-current w-5 h-5" />
              <Star className="fill-current w-5 h-5" />
              <Star className="fill-current w-5 h-5" />
              <span className="text-gray-400 ml-2 text-sm">(128 Reviews)</span>
            </div>

            <p className="text-gray-400 leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            <div className="space-y-4 mb-10">
              <FuturisticButton 
                variant="primary" 
                className="w-full h-14 text-lg"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </FuturisticButton>
              <FuturisticButton variant="glass" className="w-full h-14 text-lg border border-white/10">
                Checkout Now
              </FuturisticButton>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8 mt-4">
              <div className="flex items-center gap-3 text-gray-300">
                <ShieldCheck className="w-5 h-5 text-neon-primary" />
                <span className="text-sm">Authenticity Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Truck className="w-5 h-5 text-neon-primary" />
                <span className="text-sm">Express Secure Shipping</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
