"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get("https://lianaluxe-backend.onrender.com/products");
        setStats({
          totalProducts: data.products?.length || 0,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.loading ? "..." : stats.totalProducts,
      link: "/admin/products",
      icon: <Package className="text-neon-primary" size={24} />,
    },
    {
      title: "Total Revenue",
      value: "₦0.00",
      icon: <DollarSign className="text-neon-secondary" size={24} />,
      link: "#",
    },
    {
      title: "Active Orders",
      value: "0",
      icon: <TrendingUp className="text-blue-400" size={24} />,
      link: "#",
    },
    {
      title: "Total Customers",
      value: "1", // The admin user
      icon: <Users className="text-purple-400" size={24} />,
      link: "#",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display font-black text-white mb-8 tracking-tighter">
        DASHBOARD <span className="text-neon-primary">OVERVIEW</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <div className="bg-black/40 border border-white/5 rounded-xl p-6 hover:border-neon-primary/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 font-sans text-xs uppercase tracking-wider mb-1">
                    {card.title}
                  </p>
                  <h3 className="text-3xl font-display font-bold text-white group-hover:text-neon-primary transition-colors">
                    {card.value}
                  </h3>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  {card.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
