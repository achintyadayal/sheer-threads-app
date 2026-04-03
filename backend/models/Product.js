const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
  fabric: String,
  care: String,
  founderNote: String,
  category: String,
  sizes: [String],
  image: String,
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);