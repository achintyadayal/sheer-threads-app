const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sheer_threads_products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });
// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// CREATE product (up to 5 images)
router.post("/", protect, upload.array("images", 5), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map((f) => f.path) : [];

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      fabric: req.body.fabric,
      care: req.body.care,
      founderNote: req.body.founderNote,
      category: req.body.category,
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
      image: imageUrls[0] || "",
      images: imageUrls,
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

// UPDATE product (up to 5 images)
router.put("/:id", protect, upload.array("images", 5), async (req, res) => {
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
      category: req.body.category,
    };

    if (req.body.sizes) {
      updateData.sizes = JSON.parse(req.body.sizes);
    }

    // If new images uploaded, replace old ones
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      const oldImages = product.images || (product.image ? [product.image] : []);
      for (const imgUrl of oldImages) {
        try {
          const parts = imgUrl.split("/");
          const fileName = parts[parts.length - 1];
          const folder = parts[parts.length - 2];
          const publicId = `${folder}/${fileName.split(".")[0]}`;
          await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          console.error("Error deleting old image:", e.message);
        }
      }

      const newImageUrls = req.files.map((f) => f.path);
      updateData.image = newImageUrls[0];
      updateData.images = newImageUrls;
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
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete all images from Cloudinary
    const allImages = product.images || (product.image ? [product.image] : []);
    for (const imgUrl of allImages) {
      try {
        const parts = imgUrl.split("/");
        const fileName = parts[parts.length - 1];
        const folder = parts[parts.length - 2];
        const publicId = `${folder}/${fileName.split(".")[0]}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.error("Error deleting image:", e.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product and image deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;