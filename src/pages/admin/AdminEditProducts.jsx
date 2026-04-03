import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CATEGORIES = ["Solids", "Embroidered", "Festive"];
const FABRICS = ["Organza", "Georgette", "Chiffon", "Tissue", "Other"];
const SIZES = ["XS", "S", "M", "L", "XL"];

function AdminEditProduct() {
  const { id } = useParams();
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
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("userToken");
      const res = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      setForm({
        name: data.name || "",
        price: data.price || "",
        stock: data.stock || "",
        description: data.description || "",
        category: data.category || CATEGORIES[0],
        fabric: data.fabric || FABRICS[0],
        care: data.care || "",
        founderNote: data.founderNote || "",
      });

      setSelectedSizes(data.sizes || []);

      // Use images array if available, fall back to single image
      setExistingImages(
        data.images && data.images.length > 0
          ? data.images
          : data.image ? [data.image] : []
      );
    };

    fetchProduct();
  }, [id]);

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
    setNewImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // Sizes array must be sent as JSON string
      formData.append("sizes", JSON.stringify(selectedSizes));

      // Append new image files if selected
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("Product updated successfully ✅");
      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      alert("Error updating product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-64 p-10 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-10">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-2xl space-y-6"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description"
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
          value={form.care}
          onChange={handleChange}
          placeholder="Care Instructions"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="founderNote"
          value={form.founderNote}
          onChange={handleChange}
          placeholder="Founder Note"
          rows="3"
          className="w-full border p-3 rounded"
        />

        {/* Existing Images Preview */}
        {existingImages.length > 0 && (
          <div>
            <p className="mb-2 font-semibold">Current Images:</p>
            <div className="flex gap-4 flex-wrap">
              {existingImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`current-${index}`}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Replace Images */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Replace Images (up to 5)
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          {newImages.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {newImages.length} new file(s) selected — will replace all existing images
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white px-8 py-3 rounded-full hover:bg-amber-700 transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;