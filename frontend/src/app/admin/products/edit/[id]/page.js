"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import FuturisticButton from "@/components/ui/FuturisticButton";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    promoPrice: "",
    category: "",
    description: "",
    flashSale: false,
    rating: "5",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:5000/product/${id}`);
        const p = data.product;
        setFormData({
          name: p.name || "",
          price: p.price || "",
          promoPrice: p.promoPrice || "",
          category: p.category || "",
          description: p.description || "",
          flashSale: p.flashSale || false,
          rating: p.rating || "5",
        });
        if (p.images && p.images.length > 0) {
          setExistingImages(p.images);
        }
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
      
      const previews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreview(previews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      const data = new FormData();
      
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("rating", formData.rating);
      
      if (formData.promoPrice) data.append("promoPrice", formData.promoPrice);
      data.append("flashSale", formData.flashSale);

      if (images.length > 0) {
        images.forEach((image) => {
          data.append("images", image);
        });
      }

      await axios.put(`http://127.0.0.1:5000/product/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-neon-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/products">
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
          </button>
        </Link>
        <h1 className="text-3xl font-display font-black text-white tracking-tighter">
          EDIT <span className="text-neon-primary">PRODUCT</span>
        </h1>
      </div>

      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-black/40 border border-white/5 rounded-xl p-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-sans">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-sans">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-sans">Price (₦) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-sans">Promo Price (₦)</label>
            <input
              type="number"
              name="promoPrice"
              value={formData.promoPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-widest text-gray-400 font-sans">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary/50 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-sans">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-primary/50 transition-colors"
            />
          </div>

          <div className="flex items-center h-full pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="flashSale"
                checked={formData.flashSale}
                onChange={handleChange}
                className="w-5 h-5 rounded border-white/20 bg-black/50 text-neon-primary focus:ring-neon-primary focus:ring-offset-black"
              />
              <span className="text-sm font-sans tracking-wider text-gray-300">Feature in Flash Sale</span>
            </label>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 space-y-4">
          <label className="block text-xs uppercase tracking-widest text-gray-400 font-sans">Update Images (Overrides existing)</label>
          
          {existingImages.length > 0 && images.length === 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2 font-sans">Current Images:</p>
              <div className="flex gap-4">
                {existingImages.map((src, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded overflow-hidden border border-white/10 opacity-60">
                    <img src={`http://127.0.0.1:5000${src}`} alt={`Existing ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-black/20 hover:bg-black/40 transition-colors hover:border-neon-primary/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400 font-sans"><span className="font-semibold">Click to upload new images</span></p>
                <p className="text-xs text-gray-500 font-sans">Leave blank to keep existing images</p>
              </div>
              <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {imagePreview.length > 0 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mt-4">
              {imagePreview.map((src, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-neon-primary/50">
                  <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-end">
          <FuturisticButton 
            type="submit" 
            variant="primary" 
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? (
              <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Updating...</span>
            ) : (
              "Update Product"
            )}
          </FuturisticButton>
        </div>

      </form>
    </div>
  );
}
