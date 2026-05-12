"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutDashboard, Package, LogOut, Settings, Plus } from "lucide-react";
import FuturisticButton from "@/components/ui/FuturisticButton";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/register";

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("adminToken");
    
    if (!token && !isAuthPage) {
      router.push("/admin/login");
    } else if (token) {
      setIsAuthenticated(true);
      if (isAuthPage) {
        router.push("/admin/dashboard");
      }
    }
  }, [pathname, router, isAuthPage]);

  if (!isMounted) return null;

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-bg-base text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 border border-neon-primary/20 bg-neon-primary/5 backdrop-blur-md rounded-2xl relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-primary to-neon-secondary" />
          {children}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bg-base text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-neon-primary/20 bg-neon-primary/5 backdrop-blur-md flex flex-col">
        <div className="p-6 border-b border-neon-primary/20">
          <Link href="/admin/dashboard" className="text-2xl font-display font-black tracking-tighter">
            LIANA <span className="text-neon-primary">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${pathname === "/admin/dashboard" ? "bg-neon-primary/20 text-neon-primary border border-neon-primary/50 shadow-[0_0_15px_rgba(var(--neon-primary),0.3)]" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-sans tracking-wider text-sm uppercase">Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${pathname.startsWith("/admin/products") ? "bg-neon-primary/20 text-neon-primary border border-neon-primary/50 shadow-[0_0_15px_rgba(var(--neon-primary),0.3)]" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
          >
            <Package size={20} />
            <span className="font-sans tracking-wider text-sm uppercase">Products</span>
          </Link>

          <Link 
            href="/admin/products/add" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${pathname === "/admin/products/add" ? "bg-neon-secondary/20 text-neon-secondary border border-neon-secondary/50 shadow-[0_0_15px_rgba(var(--neon-secondary),0.3)]" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
          >
            <Plus size={20} />
            <span className="font-sans tracking-wider text-sm uppercase">Add Product</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-neon-primary/20">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="font-sans tracking-wider text-sm uppercase">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
