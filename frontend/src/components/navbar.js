"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShoppingCart, User, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { getCartCount, isLoaded } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
            {["Home", "Shop", "Collections", "About"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm font-sans text-gray-300 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <div className="relative flex items-center">
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: isSearchOpen ? 200 : 0, 
                  opacity: isSearchOpen ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mr-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    router.push(`/shop?query=${encodeURIComponent(searchQuery)}`);
                    setIsSearchOpen(false);
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
              </motion.form>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
          <div className="flex flex-col gap-8 text-center text-2xl font-display">
            {["Home", "Shop", "Collections", "About"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-400 hover:text-neon-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
