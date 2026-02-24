import React from "react";
import { X, ShoppingCart } from "lucide-react";

function CartSidebar({
  cart,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50">

      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-serif text-amber-900">
              Your Cart
            </h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex space-x-4 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-amber-900">
                        {item.name}
                      </h3>
                      <p className="text-amber-700">
                        ₹{item.price.toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="w-6 h-6 rounded-full border border-amber-300 hover:bg-amber-100"
                        >
                          -
                        </button>

                        <span className="w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="w-6 h-6 rounded-full border border-amber-300 hover:bg-amber-100"
                        >
                          +
                        </button>

                        <button
                          onClick={() => onRemove(item.id)}
                          className="ml-auto text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-amber-800">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-amber-600 text-white py-3 rounded-full hover:bg-amber-700 transition-colors font-medium"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;
