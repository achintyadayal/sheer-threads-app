import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";


function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">

      {/* Product Image (Clickable) */}
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden aspect-4/5 cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Low Stock Badge */}
          {product.stock < 10 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Only {product.stock} left!
            </div>
          )}
        </div>
      </Link>

      {/* Wishlist Button (Not Clickable for navigation) */}
      <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-neutral-800">
        <Heart className="w-5 h-5 text-amber-600" />
      </button>

      {/* Product Info */}
      <div className="p-6">

        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-serif text-amber-900 mb-2 hover:underline cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-amber-800">
            ₹{product.price.toLocaleString()}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`px-6 py-2 rounded-full transition-colors ${
              product.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-neutral-900 text-white hover:bg-amber-700"
            }`}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

    </div>
  );
}


export default ProductCard;
