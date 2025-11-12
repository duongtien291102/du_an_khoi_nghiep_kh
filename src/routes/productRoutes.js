import express from "express";
import Product from "../model/productModel.js";

const router = express.Router();

// 🟢 Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error });
  }
});

// 🔵 Lấy chi tiết 1 sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "ID không hợp lệ", error });
  }
});

// 🟡 Thêm sản phẩm mới
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi thêm sản phẩm", error });
  }
});

// 🟠 Cập nhật sản phẩm theo ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật sản phẩm", error });
  }
});

// 🔴 Xóa sản phẩm theo ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json({ message: "Đã xóa sản phẩm thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa sản phẩm", error });
  }
});

export default router;
