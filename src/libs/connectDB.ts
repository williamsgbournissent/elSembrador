import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

export default connectDB;
