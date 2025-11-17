import express from "express";
import CustomerOrder from "../model/orderModel.js";

const router = express.Router();

// 🟢 Lấy tất cả đơn hàng
router.get("/", async (req, res) => {
  try {
    const { table, status } = req.query;
    let query = {};
    
    if (table) query.table = table;
    if (status) query.status = status;
    
    const orders = await CustomerOrder.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy đơn hàng", error: error.message });
  }
});

// 🟡 Tạo đơn hàng mới từ khách hàng
router.post("/", async (req, res) => {
  try {
    const { table, orders, total } = req.body;
    
    if (!table || !orders || orders.length === 0) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng" });
    }
    
    const newOrder = new CustomerOrder({
      table,
      orders,
      total,
      status: "pending",
      done: false
    });
    
    await newOrder.save();
    res.status(201).json({ 
      success: true, 
      message: "Đặt hàng thành công", 
      data: newOrder 
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    res.status(400).json({ message: "Lỗi khi tạo đơn hàng", error: error.message });
  }
});

// 🔵 Lấy chi tiết đơn hàng
router.get("/:id", async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "ID không hợp lệ", error: error.message });
  }
});

// 🟠 Cập nhật trạng thái đơn hàng
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "preparing", "ready", "completed", "cancelled"];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: "Trạng thái không hợp lệ",
        validStatuses 
      });
    }
    
    const order = await CustomerOrder.findByIdAndUpdate(
      req.params.id,
      { status, done: status === "completed" },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật trạng thái", error: error.message });
  }
});

// 🔴 Xóa đơn hàng
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await CustomerOrder.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.json({ success: true, message: "Đã xóa đơn hàng thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa đơn hàng", error: error.message });
  }
});

export default router;
