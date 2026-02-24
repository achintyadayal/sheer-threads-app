import React, { useState } from "react";
import ProductModal from "./ProductModal";

function AdminProducts({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-gray-800">
          Products Management
        </h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">Image</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Stock</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50"
              >
                {/* Image */}
                <td className="py-3 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>

                {/* Name */}
                <td className="py-3 px-4 font-medium">
                  {product.name}
                </td>

                {/* Category */}
                <td className="py-3 px-4">
                  {product.category}
                </td>

                {/* Price */}
                <td className="py-3 px-4">
                  ₹{product.price.toLocaleString()}
                </td>

                {/* Stock */}
                <td className="py-3 px-4">
                  <span
                    className={
                      product.stock < 10
                        ? "text-red-600 font-semibold"
                        : ""
                    }
                  >
                    {product.stock}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Add / Edit Modal */}
      {(showAddModal || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
          onSave={(productData) => {
            if (editingProduct) {
              onEditProduct(editingProduct.id, productData);
            } else {
              onAddProduct(productData);
            }

            setShowAddModal(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
}

export default AdminProducts;
