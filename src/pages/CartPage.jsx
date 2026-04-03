import React, { useContext } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart } = useContext(AppContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-20 min-h-screen">

      <h1 className="text-3xl font-serif mb-8 border-b pb-4">
        Your Cart ({cart.length} items)
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-neutral-50 rounded-xl">
          <p className="text-gray-500 mb-6 text-lg">
            Your cart is currently empty.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT — PRODUCTS */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map(item => (
              <div
                key={item._id}
                className="flex gap-6 border-b pb-6"
              >
                <img
                  src={item.image || (item.images && item.images[0])}
                  alt={item.name}
                  className="w-28 h-32 object-cover rounded shadow-sm"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 flex items-center text-sm"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>

                <div className="text-right font-semibold">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT — SUMMARY */}
          <div className="bg-neutral-50 rounded-lg p-6 h-fit border border-neutral-200">
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{total}</span>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-medium">
                Free
              </span>
            </div>

            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-8 bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 transition tracking-wide"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;
