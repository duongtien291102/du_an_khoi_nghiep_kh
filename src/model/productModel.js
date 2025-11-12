import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  stock: { type: Number, required: true },
  img: { type: String },
});

export default mongoose.model("Product", productSchema);
