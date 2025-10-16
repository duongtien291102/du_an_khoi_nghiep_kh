import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const MENU = [
  { id: 1, name: "Cà phê sữa", price: 25000 },
  { id: 2, name: "Trà đào cam sả", price: 30000 },
  { id: 3, name: "Matcha đá xay", price: 35000 },
];

app.get("/api/menu", (req, res) => res.json(MENU));

app.post("/api/order", (req, res) => {
  console.log("Đơn hàng:", req.body);
  res.json({ success: true });
});

app.listen(8080, () => console.log("Server chạy tại http://localhost:8080"));
