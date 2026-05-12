"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function FeaturedSection() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        const { data } = await axios.get("http://127.0.0.1:5000/products");
        if (data.products) {
          // get the latest 8 products
          const latestProducts = [...data.products].reverse().slice(0, 8);
          const formatted = latestProducts.map(p => ({
            id: p._id,
            title: p.name,
            price: p.price.toString(),
            category: p.category,
            image: p.images && p.images[0] 
              ? (p.images[0].startsWith("/uploads") ? `http://127.0.0.1:5000${p.images[0]}` : p.images[0]) 
              : "/perf.jpg"
          }));
          setFeaturedProducts(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNewArrivals();
  }, []);

  return (
    <section className="py-32 px-6 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              NEW <span className="text-neon-primary">ARRIVALS</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Experience the latest additions to our exclusive collection. Crafted for perfection.
            </p>
          </motion.div>
          <motion.a
            href="/shop"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white hover:text-neon-primary uppercase tracking-widest font-sans text-sm border-b border-white/30 hover:border-neon-primary pb-1 transition-colors"
          >
            View All Products
          </motion.a>
        </div>

        {loading ? (
          <div className="text-center text-neon-primary py-20 font-sans text-lg">
            Loading new arrivals...
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
