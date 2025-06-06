import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

dotenv.config();
const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
};

startServer();
