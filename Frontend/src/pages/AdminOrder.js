import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminOrders.css";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/cart-orders/admin/orders");
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching admin orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put("http://localhost:8081/api/cart-orders/admin/order-status", null, {
        params: { orderId, status },
      });
      alert("Order status updated.");
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: status } : order
        )
      );
    } catch (error) {
      alert("Failed to update order status.");
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.email}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.productPrice.toFixed(2)}</td>
                <td>{order.orderStatus}</td>
                <td>
                  <button onClick={() => updateOrderStatus(order.id, "SHIPPED")}>
                    Mark as Shipped
                  </button>
                  <button onClick={() => updateOrderStatus(order.id, "DELIVERED")}>
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default AdminOrders;