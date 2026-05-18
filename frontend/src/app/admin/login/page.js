"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FuturisticButton from "@/components/ui/FuturisticButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("https://lianaluxe-backend.onrender.com/api/auth/login", {
        email,
        password,
      });
      
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-display font-black text-white mb-2 tracking-tighter text-center">
        ADMIN <span className="text-neon-primary">PORTAL</span>
      </h1>
      <p className="text-gray-400 text-sm mb-8 text-center font-sans">
        Enter your credentials to access the dashboard.
      </p>

      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="w-full space-y-5">
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
            {loading ? "Authenticating..." : "Login"}
          </FuturisticButton>
        </div>
      </form>
    </div>
  );
}
