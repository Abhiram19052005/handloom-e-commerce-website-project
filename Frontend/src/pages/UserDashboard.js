import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please log in to access your dashboard.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8081/api/auth/user/profile?email=${email}`)
      .then((response) => setUserDetails(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [navigate]);

  // Fetch user orders
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`http://localhost:8081/api/cart-orders/orders?email=${email}`)
        .then((response) => setOrders(response.data))
        .catch((error) =>
          console.error("Error fetching order history:", error)
        );
    }
  }, []);

  // Fetch user cart items
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`http://localhost:8081/api/cart-orders/cart?email=${email}`)
        .then((response) => setCartItems(response.data))
        .catch((error) =>
          console.error("Error fetching cart items:", error)
        );
    }
  }, []);

  // Navigate to cart
  const handleViewCart = () => {
    navigate("/cart");
  };

  // Cancel an order
  const handleCancelOrder = (orderId) => {
    axios
      .put(`http://localhost:8081/api/cart-orders/cancel-order`, null, {
        params: { orderId },
      })
      .then(() => {
        alert("Order canceled successfully.");
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, orderStatus: "CANCELLED" } : order
          )
        );
      })
      .catch((error) =>
        console.error("Error canceling order:", error)
      );
  };

  return (
    <div className="user-dashboard">
      <h2>Welcome, {userDetails.name || "User"}</h2>

      <div className="dashboard-section">
        <h3>Profile Details</h3>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Address:</strong> {userDetails.address || "Not provided"}</p>
        <button onClick={() => navigate("/profile/update")}>Edit Profile</button>
      </div>

      <div className="dashboard-section">
        <h3>Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <p>You have {cartItems.length} items in your cart.</p>
        )}
        <button onClick={handleViewCart}>View Cart</button>
      </div>
      <div className="dashboard-section">
        <h3>Your Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    {order.orderStatus === "DELIVERED" ? (
                      <span>Delivered</span>
                    ) : order.orderStatus === "CANCELLED" ? (
                      <span>Cancelled</span>
                    ) : (
                      <button onClick={() => handleCancelOrder(order.id)}>
                        Cancel Order
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;