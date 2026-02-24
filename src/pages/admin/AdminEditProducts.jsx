import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `http://localhost:5000/api/products/${id}`
      );
      const data = await res.json();

      setForm({
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        fabric: data.fabric,
        care: data.care,
        founderNote: data.founderNote,
        image: null,
      });

      setExistingImage(data.image);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",
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
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="fabric"
          value={form.fabric}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="care"
          value={form.care}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="founderNote"
          value={form.founderNote}
          onChange={handleChange}
          rows="3"
          className="w-full border p-3 rounded"
        />

        {/* Existing Image Preview */}
        {existingImage && (
          <div>
            <p className="mb-2 font-semibold">Current Image:</p>
            <img
              src={existingImage}
              alt="current"
              className="w-40 rounded"
            />
          </div>
        )}

        {/* Replace Image */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-amber-700 transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;