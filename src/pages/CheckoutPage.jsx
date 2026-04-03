import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { createOrder } from "../api/orderService";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod or online

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("Please login to place an order.");
        navigate("/login");
        return;
      }

      // Map cart items exactly as the Order model expects
      const orderItems = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || (item.images && item.images[0]) || "",
      }));

      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

      const orderPayload = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: fullAddress,
        totalAmount: total,
        items: orderItems,
      };

      const response = await createOrder(orderPayload);

      if (response && response._id) {
        alert(`Order placed successfully! Order ID: ${response._id}`);
        clearCart();
        navigate("/");
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 text-center">
        <h2 className="text-3xl font-serif mb-6">Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-neutral-800 transition"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-20 min-h-screen">
      <h1 className="text-3xl font-serif mb-10 border-b pb-4 text-neutral-900">
        Secure Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* LEFT COLUMN: FORMS */}
        <div>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Details */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-600">
                1. Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full border p-3 rounded bg-neutral-50 shadow-sm"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  required
                  placeholder="Phone Number"
                  className="w-full border p-3 rounded bg-neutral-50 shadow-sm"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-600">
                2. Shipping Address
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full border p-3 rounded bg-neutral-50 shadow-sm"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address, Apartment, Suite, etc."
                  className="w-full border p-3 rounded bg-neutral-50 shadow-sm"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    className="w-full border p-3 rounded bg-neutral-50 shadow-sm"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    className="w-full border p-3 rounded bg-neutral-50 shadow-sm"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Pincode / ZIP Code"
                  className="w-full md:w-1/2 border p-3 rounded bg-neutral-50 shadow-sm"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-600">
                3. Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border rounded cursor-pointer hover:bg-neutral-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-yellow-500"
                  />
                  <span className="font-medium text-neutral-800">
                    Cash on Delivery (COD)
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-4 border rounded cursor-pointer hover:bg-neutral-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-yellow-500"
                  />
                  <span className="font-medium text-neutral-800">
                    Online Payment (Currently testing)
                  </span>
                </label>
              </div>
            </section>
          </form>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 h-fit sticky top-28">
          <h2 className="text-2xl font-serif mb-6 border-b pb-4">
            Order Summary
          </h2>

          <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-4">
                <img
                  src={item.image || (item.images && item.images[0])}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded shadow-sm"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>
                  <p className="font-medium mt-1">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-300 space-y-3">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-2xl font-bold mt-4 pt-4 border-t border-neutral-300">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={loading}
            className={`w-full mt-8 py-4 rounded-full font-bold text-lg tracking-wide transition ${loading
                ? "bg-neutral-400 cursor-not-allowed"
                : "bg-black hover:bg-yellow-500 hover:text-black text-white"
              }`}
          >
            {loading ? "Processing..." : `Place Order • ₹${total}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
