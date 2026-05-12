"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/home/Footer";
import FuturisticButton from "@/components/ui/FuturisticButton";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

import { useCart } from "@/providers/CartProvider";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, isLoaded } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = getSubtotal ? getSubtotal() : 0;
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal + tax;

  if (!mounted || !isLoaded) {
    return (
      <main className="bg-bg-base min-h-screen text-white pt-24">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-neon-primary text-xl font-display">Loading Cart...</p>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="bg-bg-base min-h-screen text-white pt-24">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <p className="text-gray-400 text-xl font-display">Your cart is empty.</p>
          <Link href="/shop">
            <FuturisticButton variant="primary">Continue Shopping</FuturisticButton>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-bg-base min-h-screen text-white pt-24">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-4">
            YOUR <span className="text-neon-primary text-glow">CART</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-4 flex flex-col sm:flex-row items-center gap-6 relative group"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-black/40">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                  <Link href={`/product/${item.id}`} className="font-display font-bold text-lg hover:text-neon-primary transition-colors">
                    {item.title}
                  </Link>
                  <p className="text-neon-secondary text-sm font-sans">₦{parseFloat(item.price || 0).toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-black/40 rounded-full px-4 py-2 border border-white/10">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="font-sans text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 sticky top-32"
          >
            <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 font-sans text-sm text-gray-300 mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>₦{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-neon-primary">Free</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between text-white font-bold text-lg mt-4">
                <span>Total</span>
                <span className="text-neon-secondary text-glow-secondary">₦{total.toFixed(2)}</span>
              </div>
            </div>

            <FuturisticButton variant="primary" className="w-full flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </FuturisticButton>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
