import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/product.js";
import User from "./src/models/user.js";

dotenv.config();

const localDBURL = "mongodb://localhost:27017/LIANA_LUXE";
const remoteDBURL = process.env.DBURL;

async function migrateData() {
  if (remoteDBURL.includes("<db_password>")) {
    console.error("Error: Please replace <db_password> in your .env file with your actual password!");
    process.exit(1);
  }

  console.log("Connecting to Local Database...");
  const localConnection = await mongoose.createConnection(localDBURL).asPromise();
  console.log("Connected to Local Database.");

  console.log("Connecting to Remote Database (Atlas)...");
  const remoteConnection = await mongoose.createConnection(remoteDBURL).asPromise();
  console.log("Connected to Remote Database.");

  try {
    // 1. Migrate Products
    console.log("Fetching local products...");
    const localProducts = await localConnection.model('Product', Product.schema).find().lean();
    console.log(`Found ${localProducts.length} products. Migrating to Atlas...`);
    
    if (localProducts.length > 0) {
      const RemoteProduct = remoteConnection.model('Product', Product.schema);
      await RemoteProduct.deleteMany({}); // clear existing
      await RemoteProduct.insertMany(localProducts);
      console.log("Products migrated successfully.");
    }

    // 2. Migrate Users
    console.log("Fetching local users...");
    const localUsers = await localConnection.model('User', User.schema).find().lean();
    console.log(`Found ${localUsers.length} users. Migrating to Atlas...`);

    if (localUsers.length > 0) {
      const RemoteUser = remoteConnection.model('User', User.schema);
      await RemoteUser.deleteMany({}); // clear existing
      await RemoteUser.insertMany(localUsers);
      console.log("Users migrated successfully.");
    }

    console.log("Migration finished successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    await localConnection.close();
    await remoteConnection.close();
    process.exit(0);
  }
}

migrateData();
