import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    axios
      .get(`http://localhost:8081/api/cart-orders/orders?email=${email}`)
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching order history:", error));
  }, []);

  return (
    <div>
      <h2>Your Order History</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.productName}</p>
          <p>{order.productDescription}</p>
          <p>Price: ${order.productPrice}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Status: {order.orderStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;