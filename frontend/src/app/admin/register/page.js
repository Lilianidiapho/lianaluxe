"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import FuturisticButton from "@/components/ui/FuturisticButton";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://127.0.0.1:5000/api/auth/register", {
        email,
        password,
      });
      // Automatically navigate to login on success
      router.push("/admin/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-display font-black text-white mb-2 tracking-tighter text-center">
        ADMIN <span className="text-neon-primary">SETUP</span>
      </h1>
      <p className="text-gray-400 text-sm mb-8 text-center font-sans">
        Create the initial admin account. (Temporary Route)
      </p>

      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="w-full space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-sans">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary/50 transition-colors"
            placeholder="admin@lianaluxe.com"
            required
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-sans">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary/50 transition-colors"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="pt-2">
          <FuturisticButton 
            type="submit" 
            variant="primary" 
            className="w-full justify-center py-3"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Admin Account"}
          </FuturisticButton>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link href="/admin/login" className="text-neon-primary hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}
