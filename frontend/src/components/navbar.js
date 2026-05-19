"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, MenuIcon, ChevronDown, Instagram, Phone, Video } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const router = useRouter();
  const { getCartCount, isLoaded } = useCart();
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Fetch products for live search
    async function fetchProducts() {
      try {
        const { data } = await axios.get("https://lianaluxe-backend.onrender.com/products");
        if (data.products) {
          setAllProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products for search", error);
      }
    }
    fetchProducts();
  }, []);

  // Handle live search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5); // Limit to 5 results in dropdown
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allProducts]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Transition background from transparent to glass on scroll
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(5, 5, 5, 0.8)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  return (
    <>
      <motion.nav
        style={{ background, backdropFilter: backdropBlur }}
        className="fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-16 border-b border-white/5 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="relative group flex items-center">
            <span className="text-2xl font-display font-bold tracking-tighter text-white group-hover:text-neon-primary transition-colors">
              LIANA LUXE
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-primary origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {["Home", "Shop", "About"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm font-sans text-gray-300 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* Contact Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsContactOpen(true)}
              onMouseLeave={() => setIsContactOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-sans text-gray-300 hover:text-white transition-colors cursor-default">
                Contact <ChevronDown className="w-4 h-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-primary transition-all duration-300 group-hover:w-full" />
              </button>
              
              <AnimatePresence>
                {isContactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 py-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden"
                  >
                    <a href="https://www.tiktok.com/@liana.luxee?_r=1&_t=ZS-96TjkBMyNy4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-neon-primary hover:bg-white/5 transition-colors">
                      <Video className="w-4 h-4" /> TikTok
                    </a>
                    <a href="https://www.instagram.com/liana.luxee?igsh=MTRyZjg3a3BwNTl6Ng%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-neon-primary hover:bg-white/5 transition-colors">
                      <Instagram className="w-4 h-4" /> Instagram
                    </a>
                    <a href="https://wa.me/message/WTXC3H2CJGGSO1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-neon-primary hover:bg-white/5 transition-colors">
                      <Phone className="w-4 h-4" /> WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <div className="relative flex items-center" ref={searchRef}>
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: isSearchOpen ? 200 : 0, 
                  opacity: isSearchOpen ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
                className="overflow-visible mr-2 relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    router.push(`/shop?query=${encodeURIComponent(searchQuery)}`);
                    setIsSearchOpen(false);
                    setSearchResults([]);
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-full px-4 py-1 text-sm text-white focus:outline-none focus:border-neon-primary placeholder-gray-500"
                />
                
                {/* Live Search Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-3 w-[300px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50"
                    >
                      {searchResults.map(product => {
                        const imgPath = product.images && product.images[0]
                          ? (product.images[0].startsWith("/uploads") ? `https://lianaluxe-backend.onrender.com${product.images[0]}` : product.images[0])
                          : "/perf.jpg";
                        
                        return (
                          <div 
                            key={product._id}
                            onClick={() => {
                              router.push(`/product/${product._id}`);
                              setIsSearchOpen(false);
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                            className="flex items-center gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                          >
                            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-white/5">
                              <img src={imgPath} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-sans text-white truncate max-w-[200px]">{product.name}</span>
                              <span className="text-xs text-neon-primary">₦{product.price}</span>
                            </div>
                          </div>
                        );
                      })}
                      <div 
                        className="px-4 py-3 text-xs text-center text-gray-400 hover:text-white cursor-pointer bg-white/5 transition-colors"
                        onClick={() => {
                          router.push(`/shop?query=${encodeURIComponent(searchQuery)}`);
                          setIsSearchOpen(false);
                          setSearchResults([]);
                        }}
                      >
                        View all results for "{searchQuery}"
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
              <button 
                type="button"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) {
                    setSearchQuery("");
                    setSearchResults([]);
                  }
                }}
                className="text-gray-300 hover:text-neon-primary transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            <button className="text-gray-300 hover:text-neon-primary transition-colors">
              <User className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative text-gray-300 hover:text-neon-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {mounted && isLoaded && getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-neon-primary text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden text-white"
              onClick={() => setIsOpen(true)}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <div className="flex flex-col gap-8 text-center text-2xl font-display">
              {["Home", "Shop", "About"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-neon-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              
              <div className="w-16 h-[1px] bg-white/20 mx-auto my-2"></div>
              
              <p className="text-sm text-gray-500 uppercase tracking-widest font-sans">Contact Us</p>
              <div className="flex flex-col gap-6 font-sans text-xl">
                <a href="https://www.tiktok.com/@liana.luxee?_r=1&_t=ZS-96TjkBMyNy4" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-primary transition-colors flex items-center justify-center gap-3" onClick={() => setIsOpen(false)}>
                  <Video className="w-5 h-5" /> TikTok
                </a>
                <a href="https://www.instagram.com/liana.luxee?igsh=MTRyZjg3a3BwNTl6Ng%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-primary transition-colors flex items-center justify-center gap-3" onClick={() => setIsOpen(false)}>
                  <Instagram className="w-5 h-5" /> Instagram
                </a>
                <a href="https://wa.me/message/WTXC3H2CJGGSO1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-primary transition-colors flex items-center justify-center gap-3" onClick={() => setIsOpen(false)}>
                  <Phone className="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
