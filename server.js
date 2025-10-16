import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API route
app.use("/api/products", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
