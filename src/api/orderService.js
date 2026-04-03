const API_URL = import.meta.env.VITE_API_URL + "/api/orders";

const getAuthHeaders = () => {
  const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getOrders = async () => {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.json();
};