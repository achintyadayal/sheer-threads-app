import React from "react";

function AdminOrders({ orders, onUpdateOrderStatus }) {

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>

      {/* Title */}
      <h2 className="text-2xl font-serif text-gray-800 mb-6">
        Orders Management
      </h2>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Items</th>
              <th className="text-left py-3 px-4">Total</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >
                {/* Order ID */}
                <td className="py-3 px-4 font-medium">
                  {order.id}
                </td>

                {/* Customer Info */}
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium">
                      {order.customerName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.email}
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3 px-4">
                  {order.date}
                </td>

                {/* Items Count */}
                <td className="py-3 px-4">
                  {order.items.length}
                </td>

                {/* Total */}
                <td className="py-3 px-4 font-semibold">
                  ₹{order.total.toLocaleString()}
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>

                {/* Status Update */}
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      onUpdateOrderStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default AdminOrders;
