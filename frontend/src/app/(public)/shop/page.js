"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/home/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const categories = ["All", "Fragrance Mist", "Anti Perspirant and Hand Creams", "Candle", "Set", "Wellness & Care"];

function ShopContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [activeCategory, setActiveCategory] = useState("All");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("https://lianaluxe-backend.onrender.com/products");
        if (data.products) {
          const formatted = data.products.map(p => ({
            id: p._id,
            title: p.name,
            price: p.price.toString(),
            category: p.category,
            image: p.images && p.images[0] 
              ? (p.images[0].startsWith("/uploads") ? `https://lianaluxe-backend.onrender.com${p.images[0]}` : p.images[0]) 
              : "/perf.jpg"
          }));
          setAllProducts(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesQuery = query ? p.title.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query)) : true;
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="bg-bg-base min-h-screen text-white pt-24">
      <Navbar />
      
      <section className="px-6 lg:px-16 py-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4">
            THE <span className="text-neon-primary text-glow">COLLECTION</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {query ? `Search results for "${searchParams.get("query")}"` : "Discover our full range of luxury products designed for the immersive era."}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-sans text-sm tracking-wide transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-neon-primary text-black font-bold shadow-[0_0_15px_rgba(0,255,204,0.4)]" 
                  : "glass-panel hover:border-neon-primary hover:text-neon-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center text-neon-primary py-20 font-sans text-lg">
            Loading collection...
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 py-20 font-sans text-lg">
            No products found{query ? " matching your search" : " in this category"}.
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="bg-bg-base min-h-screen pt-24 text-center text-white">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
