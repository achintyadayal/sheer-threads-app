import React, { useState } from "react";

function CheckoutPage({ cart, onPlaceOrder }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h2 className="text-3xl font-serif text-amber-900 mb-6">
        Checkout
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2"
          placeholder="Name"
          onChange={e=>setFormData({...formData,name:e.target.value})}
        />

        <input className="w-full border p-2"
          placeholder="Email"
          onChange={e=>setFormData({...formData,email:e.target.value})}
        />

        <button className="bg-neutral-900 text-white px-6 py-3 rounded hover:bg-neutral-800">
          Place Order (₹{total})
        </button>
      </form>

    </div>
  );
}

export default CheckoutPage;
