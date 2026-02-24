import React from "react";

function UserOrders({ orders, currentUser }) {

  const userOrders = orders.filter(
    o => o.email === currentUser?.email
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-serif text-amber-900 mb-6">
        My Orders
      </h1>

      {userOrders.map(order => (
        <div key={order.id}
          className="bg-white rounded-lg shadow p-6 mb-4">

          <div className="flex justify-between">
            <span>Order #{order.id}</span>
            <span>{order.status}</span>
          </div>

          <div className="mt-2">
            Total: ₹{order.total}
          </div>
        </div>
      ))}

    </div>
  );
}

export default UserOrders;
