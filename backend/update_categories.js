import mongoose from "mongoose";
import Product from "./src/models/product.js";

const dburl = "mongodb://localhost:27017/LIANA_LUXE";

async function updateCategories() {
  try {
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB.");

    // Update 'Fragrance' to 'Fragrance Mist'
    const resultFragrance = await Product.updateMany(
      { category: "Fragrance" },
      { $set: { category: "Fragrance Mist" } }
    );
    console.log(`Updated ${resultFragrance.modifiedCount} products from Fragrance to Fragrance Mist`);

    // Update 'Mist' to 'Anti Perspirant and Hand Creams'
    const resultMist = await Product.updateMany(
      { category: "Mist" },
      { $set: { category: "Anti Perspirant and Hand Creams" } }
    );
    console.log(`Updated ${resultMist.modifiedCount} products from Mist to Anti Perspirant and Hand Creams`);

    console.log("Category update completed.");
    process.exit(0);
  } catch (error) {
    console.error("Update failed:", error);
    process.exit(1);
  }
}

updateCategories();
