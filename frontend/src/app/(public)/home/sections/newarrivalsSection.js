"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ui/ProductCard";

export default function NewarrivalSection() {
  const [newarrivalProducts, setNewarrivalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        const { data } = await axios.get("http://127.0.0.1:5000/products");
        if (data.products) {
          // latest products added will be the new arrivals
          const latestProducts = [...data.products].reverse().slice(0, 8);
          
          const formatted = latestProducts.map(p => ({
            id: p._id,
            name: p.name,
            title: p.name,
            price: p.price,
            oldPrice: p.promoPrice || null,
            category: p.category,
            flashSale: p.flashSale || false,
            rating: p.rating || 5,
            reviews: Math.floor(Math.random() * 20) + 1, // mock reviews since it's not in db
            image: p.images && p.images[0] 
              ? (p.images[0].startsWith("/uploads") ? `http://127.0.0.1:5000${p.images[0]}` : p.images[0]) 
              : "/perf.jpg"
          }));
          setNewarrivalProducts(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNewArrivals();
  }, []);

  return (
    <section className=" bg-[#E9EAED]  rounded-2xl p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">
        New Arrivals
      </h1>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading new arrivals...</div>
      ) : (
        <div className=" grid grid-cols-2 lg:grid-cols-4 gap-8 ">
          {newarrivalProducts.map((product, index) => (
            <ProductCard
              key={product.id || index}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      )}
    </section>
  );
}
