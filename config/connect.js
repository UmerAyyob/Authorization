import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log("Error:", error);
  }
};
