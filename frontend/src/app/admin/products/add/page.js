"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import FuturisticButton from "@/components/ui/FuturisticButton";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    promoPrice: "",
    category: "",
    description: "",
    flashSale: false,
    rating: "5",
  });

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

      images.forEach((image) => {
        data.append("images", image); // The backend expects an array of files with the key "images"
      });

      await axios.post("http://127.0.0.1:5000/product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/products">
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
          </button>
        </Link>
        <h1 className="text-3xl font-display font-black text-white tracking-tighter">
          ADD <span className="text-neon-primary">PRODUCT</span>
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
              placeholder="e.g. Neon Cyber Jacket"
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
              placeholder="e.g. Outerwear"
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
              placeholder="0.00"
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
              placeholder="0.00 (Optional)"
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
            placeholder="Product details..."
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
          <label className="block text-xs uppercase tracking-widest text-gray-400 font-sans">Product Images</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-black/20 hover:bg-black/40 transition-colors hover:border-neon-primary/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400 font-sans"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 font-sans">PNG, JPG or WEBP (Max. 5MB)</p>
              </div>
              <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {imagePreview.length > 0 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mt-4">
              {imagePreview.map((src, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
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
              <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Saving...</span>
            ) : (
              "Save Product"
            )}
          </FuturisticButton>
        </div>

      </form>
    </div>
  );
}
