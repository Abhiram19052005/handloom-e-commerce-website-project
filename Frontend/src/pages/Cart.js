import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;
    axios
      .get(`http://localhost:8081/api/cart-orders/cart?email=${email}`)
      .then((response) => {
        setCartItems(response.data);
        calculateTotal(response.data); // Calculate total cost initially
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    axios
      .put(`http://localhost:8081/api/cart-orders/cart/update`, null, {
        params: { itemId, quantity: newQuantity },
      })
      .then((response) => {
        const updatedItem = response.data; // Updated cart item from the backend
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        calculateTotal(
          cartItems.map((item) =>
            item.id === updatedItem.id
              ? { ...item, quantity: newQuantity }
              : item
          )
        ); // Recalculate total cost
      })
      .catch((error) => console.error("Error updating cart item:", error));
  };

  // Calculate total cost
  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );
    setTotalCost(total);
  };

  // Handle payment
  const handlePayment = () => {
    if (paymentMethod === "CARD") {
      navigate("/payment-gateway"); // Redirect to payment gateway for card payment
    } else {
      // Proceed with COD
      const email = localStorage.getItem("email");
      if (!email) return;

      axios
        .post(`http://localhost:8081/api/cart-orders/cart/place-order`, null, {
          params: { email, paymentMethod },
        })
        .then(() => {
          alert("Order placed successfully!");
          setCartItems([]); // Clear the cart
          setTotalCost(0); // Reset total cost
        })
        .catch((error) => console.error("Error placing order:", error));
    }
  };
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={`data:image/jpeg;base64,${item.productImage}`}
                alt={item.productName}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p>
                  <b>{item.productName}</b>
                </p>
                <p>{item.productDescription}</p>
                <p>
                  <b>Price:</b> ${item.productPrice}
                </p>
                <div className="cart-item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
          </div>
          <div className="cart-actions">
            <select
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              className="payment-method"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="CARD">Card Payment</option>
            </select>
            <button onClick={handlePayment} className="place-order-button">
              Proceed to Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;