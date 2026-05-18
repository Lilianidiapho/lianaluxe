"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Edit2, Trash2, Plus } from "lucide-react";
import FuturisticButton from "@/components/ui/FuturisticButton";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://lianaluxe-backend.onrender.com/products");
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`https://lianaluxe-backend.onrender.com/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error("Error deleting product", error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-black text-white tracking-tighter">
          MANAGE <span className="text-neon-primary">PRODUCTS</span>
        </h1>
        <Link href="/admin/products/add">
          <FuturisticButton variant="primary" className="flex items-center gap-2">
            <Plus size={18} /> Add Product
          </FuturisticButton>
        </Link>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-sans text-xs uppercase tracking-wider">
                <th className="p-4 font-normal">Name</th>
                <th className="p-4 font-normal">Category</th>
                <th className="p-4 font-normal">Price</th>
                <th className="p-4 font-normal text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">
                      <div className="flex items-center gap-3">
                        {product.images && product.images.length > 0 && (
                          <div className="w-10 h-10 rounded overflow-hidden bg-white/10 flex-shrink-0">
                            <img 
                              src={`https://lianaluxe-backend.onrender.com${product.images[0]}`} 
                              alt={product.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        )}
                        {product.name}
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{product.category}</td>
                    <td className="p-4 text-neon-secondary">₦{product.price}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link href={`/admin/products/edit/${product._id}`}>
                          <button className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded transition-colors">
                            <Edit2 size={16} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
