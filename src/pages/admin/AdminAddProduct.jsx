import { useState } from "react";

function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    fabric: "",
    care: "",
    founderNote: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      formData.append("fabric", form.fabric);
      formData.append("care", form.care);
      formData.append("founderNote", form.founderNote);
      formData.append("image", form.image);

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      alert("Product added successfully ✅");

      // Reset form
      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        fabric: "",
        care: "",
        founderNote: "",
        image: null,
      });

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

        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full border p-3 rounded"
        />

        {/* Fabric */}
        <input
          type="text"
          name="fabric"
          placeholder="Fabric Details"
          value={form.fabric}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Care */}
        <input
          type="text"
          name="care"
          placeholder="Care Instructions"
          value={form.care}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Founder Note */}
        <textarea
          name="founderNote"
          placeholder="Founder Note"
          value={form.founderNote}
          onChange={handleChange}
          rows="3"
          className="w-full border p-3 rounded"
        />

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-amber-700 transition duration-300"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}

export default AdminAddProduct;