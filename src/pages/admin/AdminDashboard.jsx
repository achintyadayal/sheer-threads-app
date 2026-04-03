import React, { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [productsRes, ordersRes] = await Promise.all([
          fetch(`${API_URL}/api/products`, { headers }),
          fetch(`${API_URL}/api/orders`, { headers }),
        ]);

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        setProducts(Array.isArray(productsData) ? productsData : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || order.total || 0),
    0
  );

  const totalOrders = orders.length;
  const totalProducts = products.length;

  const pendingOrders = orders.filter(
    order => order.status === "Pending" || order.status === "pending"
  ).length;

  const stats = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      color: "bg-green-500"
    },
    {
      label: "Total Orders",
      value: totalOrders,
      color: "bg-blue-500"
    },
    {
      label: "Products",
      value: totalProducts,
      color: "bg-purple-500"
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="ml-64 p-10 bg-neutral-50 min-h-screen">

      {/* Title */}
      <h2 className="text-2xl font-serif text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </div>

            <p className="text-gray-600 text-sm">
              {stat.label}
            </p>

            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr
                  key={order._id || order.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    {(order._id || order.id || "").slice(-6)}
                  </td>

                  <td className="py-3 px-4">
                    {order.customerName}
                  </td>

                  <td className="py-3 px-4">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : order.date}
                  </td>

                  <td className="py-3 px-4">
                    ₹{(order.totalAmount || order.total || 0).toLocaleString()}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${order.status === "Delivered" || order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped" || order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
