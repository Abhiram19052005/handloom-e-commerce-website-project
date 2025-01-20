import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please log in to view your order history.");
      return;
    }

    axios
      .get(`http://localhost:8081/api/cart-orders/orders?email=${email}`)
      .then((response) => setOrders(response.data || []))
      .catch((error) => console.error("Error fetching order history:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading your order history...</p>;
  }

  return (
    <div className="order-history-container">
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>${order.productPrice.toFixed(2)}</td>
                <td>{order.quantity}</td>
                <td>${(order.productPrice * order.quantity).toFixed(2)}</td>
                <td>{order.orderStatus}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;