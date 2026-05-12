"use client";

import { Heart, Star } from "lucide-react";

export default function ProductCard({
  image,
  name,
  rating,
  reviews,
  price,
  oldPrice,
  flashSale
}) {
  return (
    <div className="bg-white rounded-2xl p-4 hover:scale-108 transition-transform hover:shadow-2xl relative">

      {/* IMAGE  */}
      <div className="relative">

        {/* Flash Sale  */}
        {flashSale && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-3 py-1 rounded-full">
            Flash Sale
          </span>
        )}

        {/* Heart Icon */}
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
          <Heart size={16} />
        </button>

        <img
          src={image}
          alt={name}
          className="w-full h-65 object-cover rounded-xl"
        />
      </div>

      {/* PRODUCT INFO */}
      <h3 className="mt-3 font-semibold">{name}</h3>

      {/* Rating + Reviews */}
      <div className="flex items-center gap-1 text-sm mt-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
        ))}
        <span className="text-gray-500">({reviews} reviews)</span>
      </div>

      {/* Price Area */}
      <div className="flex gap-2 mt-2 items-center">
        <span className="font-bold text-lg">
          ₦{price.toLocaleString()}
        </span>

        {oldPrice && (
          <span className="text-green-600 line-through">
            ₦{oldPrice.toLocaleString()}
          </span>
        )}
      </div>

    </div>
  );
}
