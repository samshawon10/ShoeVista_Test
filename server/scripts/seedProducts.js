
import dotenv from "dotenv";
import mongoose from "mongoose";
import Products from "../models/productModel.js";
import dummyProducts from "../data/dummyProducts.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const product of dummyProducts) {
      await Products.updateOne(
        { title: product.title },
        { $set: product },
        { upsert: true }
      );
    }

    console.log(`Seeded ${dummyProducts.length} products successfully.`);
  } catch (error) {
    console.error(`Error seeding products: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();