import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  promoPrice: { type: Number },
  category: { type: String, required: true },
  images: { type: [String] },
  description: { type: String, required: true },
  flashSale: { type: Boolean },
  rating: { type: Number },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
