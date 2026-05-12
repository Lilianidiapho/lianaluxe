import mongoose from "mongoose";
import Product from "./src/models/product.js";

const dburl = "mongodb://localhost:27017/LIANA_LUXE";

const allProducts = [
  { name: "Midnight Addiction", price: 120, category: "Fragrance", images: ["/midnight addiction .jpeg"], description: "A deeply captivating scent that evokes the mysteries of the night. Featuring notes of dark vanilla, amber, and rare orchids. Long-lasting sillage meant for unforgettable evenings." },
  { name: "Aqua Hour", price: 85, category: "Fragrance", images: ["/aqua hour .jpeg"], description: "Refreshing and vibrant. A burst of oceanic accords, bergamot, and sea salt. Perfect for the active and the bold." },
  { name: "Madam Mystique", price: 150, category: "Fragrance", images: ["/madam mystique.jpeg"], description: "An elegant and mysterious fragrance." },
  { name: "Champagne Toast", price: 95, category: "Mist", images: ["/champagnt toast.jpeg"], description: "A sparkling, fruity mist." },
  { name: "Floral Fantasy", price: 75, category: "Mist", images: ["/floral fantasy.jpeg"], description: "A dreamy floral mist." },
  { name: "Macaron Cloud", price: 65, category: "Candle", images: ["/macaron cloud.jpeg"], description: "A sweet macaron scented candle." },
  { name: "Cozy Vanilla Bourbon", price: 55, category: "Candle", images: ["/cozy vanilla bourbon.jpeg"], description: "Warm and cozy vanilla bourbon candle." },
  { name: "Everyday Luxuries", price: 180, category: "Set", images: ["/luxeries .jpeg"], description: "The ultimate luxury set." },
  { name: "Beard Set", price: 40000, promoPrice: 50000, category: "Set", images: ["/beard set.jpeg"], description: "Complete beard care set.", flashSale: true, rating: 4 },
  { name: "3-Wick Candle", price: 45000, category: "Candle", images: ["/big candle .jpeg"], description: "Long lasting 3-wick candle.", flashSale: false, rating: 3 },
  { name: "Cologne Mist", price: 30000, category: "Mist", images: ["/cologne mist.jpeg"], description: "Refreshing cologne mist.", flashSale: false, rating: 5 },
  { name: "Anti-Bactrial Hand Creams ", price: 6000, promoPrice: 8000, category: "Set", images: ["/hand creams.jpeg"], description: "Moisturizing anti-bacterial hand creams.", flashSale: true, rating: 4 },
  { name: "Mini mist", price: 15000, category: "Mist", images: ["/mini  mist.jpeg"], description: "Portable mini mist.", flashSale: false, rating: 5 },
  { name: "Gingham Glow Set", price: 40000, promoPrice: 50000, category: "Set", images: ["/gingham set.jpeg"], description: "Gingham glow body care set.", flashSale: true, rating: 4 },
  { name: "Fine Fragrance Mists", price: 30000, category: "Mist", images: ["/mixed mist.jpeg"], description: "Collection of fine fragrance mists.", flashSale: false, rating: 5 },
  { name: "night set mist", price: 120000, promoPrice: 150000, category: "Set", images: ["/night set.jpeg"], description: "Premium night care set.", flashSale: true, rating: 5 },
  { name: "Anti Perspirant", price: 15000, category: "Fragrance", images: ["/anti pesrpirant .jpeg"], description: "Effective anti-perspirant.", flashSale: false, rating: 4 },
  { name: "Shimmer Mist", price: 25000, promoPrice: 30000, category: "Mist", images: ["/shimmer mist.jpeg"], description: "Sparkling shimmer mist.", flashSale: true, rating: 4 },
  { name: "Cleansing Bar Soaps", price: 15000, category: "Set", images: ["/soaps.jpeg"], description: "Nourishing bar soaps.", flashSale: false, rating: 4 },
  { name: "Anti Perspirant Women", price: 15000, category: "Fragrance", images: ["/women anti.jpeg"], description: "Anti-perspirant for women.", flashSale: false, rating: 4 }
];

async function migrate() {
  try {
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB.");

    for (const prod of allProducts) {
      const existing = await Product.findOne({ name: prod.name });
      if (!existing) {
        await Product.create(prod);
        console.log(`Inserted: ${prod.name}`);
      } else {
        console.log(`Skipped existing: ${prod.name}`);
      }
    }
    
    console.log("Migration completed.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
