import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("userToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <div className="ml-64 p-10 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-10">
        Order Management
      </h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              {/* Customer Info */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">
                    {order.customerName}
                  </h2>
                  <p className="text-gray-600">
                    {order.email}
                  </p>
                  <p className="text-gray-600">
                    {order.phone}
                  </p>
                  <p className="text-gray-700 mt-2">
                    {order.address}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    Total: ₹{order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">
                  Ordered Products
                </h3>

                <div className="space-y-4">
                  {order.items && order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-medium">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Control */}
              <div className="mt-6 flex items-center space-x-4">
                <span className="font-semibold">
                  Status:
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;