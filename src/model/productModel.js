import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    code: { 
      type: String, 
      required: [true, "Mã sản phẩm là bắt buộc"],
      unique: true,
      trim: true
    },
    name: { 
      type: String, 
      required: [true, "Tên sản phẩm là bắt buộc"],
      trim: true
    },
    // Hỗ trợ cả 2 field: price (cũ) và sell (mới từ admin)
    price: { 
      type: Number,
      min: [0, "Giá phải lớn hơn 0"]
    },
    sell: { 
      type: Number,
      min: [0, "Giá bán phải lớn hơn 0"]
    },
    cost: { 
      type: Number,
      min: [0, "Giá vốn phải lớn hơn 0"]
    },
    stock: { 
      type: Number,
      min: [0, "Số lượng không được âm"],
      default: 0
    },
    img: { 
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: "Khác"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { 
    timestamps: true,
    versionKey: false
  }
);

// Virtual field: Nếu không có sell thì dùng price, và ngược lại
productSchema.virtual('displayPrice').get(function() {
  return this.sell || this.price || 0;
});

// Index để tìm kiếm nhanh hơn
productSchema.index({ name: 1 });
productSchema.index({ code: 1 });

export default mongoose.model("Product", productSchema);
