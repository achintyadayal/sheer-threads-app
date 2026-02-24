import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
} from "../../api/productService";




function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="p-10 ml-64">

      <h1 className="text-3xl font-bold mb-8">
        Product Management
      </h1>

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

                <td className={`p-4 ${
                  product.stock < 5 ? "text-red-500 font-semibold" : ""
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
    </div>
  );
}

export default AdminProducts;