import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CATEGORIES = ["Solids", "Embroidered", "Festive"];
const FABRICS = ["Organza", "Georgette", "Chiffon", "Tissue", "Other"];
const SIZES = ["XS", "S", "M", "L", "XL"];

function AdminAddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: CATEGORIES[0],
    fabric: FABRICS[0],
    care: "",
    founderNote: "",
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("fabric", form.fabric);
      formData.append("care", form.care);
      formData.append("founderNote", form.founderNote);

      // Sizes array must be sent as JSON string in FormData
      formData.append("sizes", JSON.stringify(selectedSizes));

      // Append each image file
      images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(
        `${API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      alert("Product added successfully ✅");
      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      alert("Error adding product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-64 p-10 bg-neutral-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-10">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-2xl space-y-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full border p-3 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Collection/Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Collection
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-3 rounded bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Fabric Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Fabric
            </label>
            <select
              name="fabric"
              value={form.fabric}
              onChange={handleChange}
              className="w-full border p-3 rounded bg-white"
            >
              {FABRICS.map((fab) => (
                <option key={fab} value={fab}>
                  {fab}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sizes Multi-Select */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Available Sizes
          </label>
          <div className="flex gap-3 flex-wrap">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 border rounded-full transition-colors ${selectedSizes.includes(size)
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
          {selectedSizes.length === 0 && (
            <p className="text-xs text-red-500 mt-1">
              Select at least one size (unless it's a one-size item)
            </p>
          )}
        </div>

        <input
          type="text"
          name="care"
          placeholder="Care Instructions (e.g., Dry Clean Only)"
          value={form.care}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="founderNote"
          placeholder="Founder Note"
          value={form.founderNote}
          onChange={handleChange}
          rows="3"
          className="w-full border p-3 rounded"
        />

        {/* Multi-Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Product Images (up to 5)
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="w-full border p-2 rounded"
          />
          {images.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {images.length} file(s) selected
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white px-8 py-3 rounded-full hover:bg-amber-700 transition duration-300"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}

export default AdminAddProduct;