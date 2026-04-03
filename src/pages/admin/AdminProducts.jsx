import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("userToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-10 ml-64">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Product Management
        </h1>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Product</span>
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-neutral-100 text-left">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">

                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-4">{product.name}</td>
                  <td className="p-4">₹{product.price}</td>

                  <td className={`p-4 ${product.stock < 5 ? "text-red-500 font-semibold" : ""
                    }`}>
                    {product.stock}
                  </td>

                  <td className="p-4 space-x-4">
                    <button
                      onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;