const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//second way for designing schema
const ProductCartSchema = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = mongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    status: {
      type: String,
      default: "",
      enum: ["Cancelled", "Processing", "Delivered", "Received", "Shipped"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
