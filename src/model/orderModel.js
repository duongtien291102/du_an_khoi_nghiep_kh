import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    table: {
      type: String,
      required: true,
      trim: true
    },
    orders: [{
      id: String,
      name: String,
      price: Number,
      quantity: Number
    }],
    total: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending"
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  { 
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("CustomerOrder", orderSchema);
