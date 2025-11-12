import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 🧩 Xác định đường dẫn tuyệt đối
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🟢 Serve FE (folder src/screen)
app.use(express.static(path.join(__dirname, "src", "screen")));

// ✅ Chặn lỗi favicon.ico 404
app.get("/favicon.ico", (req, res) => res.status(204));

// 🧠 Khi vào "/", gửi file index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "screen", "index.html"));
});

// 🧠 Khi vào "/order.html", gửi file order.html
app.get("/order.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "screen", "order.html"));
});

// 🧠 Route API
app.use("/api/products", productRoutes);

// ✅ Khởi chạy server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, "src", "screen")}`);
});
