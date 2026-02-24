import React from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartPage({
  cart,
  updateCartQuantity,
  removeFromCart
}) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-serif mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded"
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
                key={item.id}
                className="flex gap-6 border-b pb-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-32 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-600">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      className="px-3 border"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      className="px-3 border"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  <Trash2 />
                </button>
              </div>
            ))}

          </div>

          {/* RIGHT — SUMMARY */}
          <div className="border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-6">
              <span>Shipping</span>
              <span className="text-green-600">
                Free
              </span>
            </div>

            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-black text-white py-3 rounded"
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
