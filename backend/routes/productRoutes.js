const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sheer_threads_products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });
// GET all products
router.get("/", protect,  async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product
router.get("/:id", protect, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// CREATE product
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      fabric: req.body.fabric,
      care: req.body.care,
      founderNote: req.body.founderNote,
      image: req.file ? req.file.path : "",
    });

    const saved = await newProduct.save();
    res.json(saved);

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
});

// UPDATE product
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateData = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      fabric: req.body.fabric,
      care: req.body.care,
      founderNote: req.body.founderNote,
    };

    // If new image uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (product.image) {
        const parts = product.image.split("/");
        const fileName = parts[parts.length - 1];
        const folder = parts[parts.length - 2];
        const publicId = `${folder}/${fileName.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      }

      updateData.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE product
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract public_id from Cloudinary URL
    if (product.image) {
      const parts = product.image.split("/");
      const fileName = parts[parts.length - 1];
      const folder = parts[parts.length - 2];
      const publicId = `${folder}/${fileName.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product and image deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;