import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};
