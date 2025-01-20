import React, { useState } from "react";
import "../styles/PaymentGateway.css"; // Add custom styles for the payment gateway

const PaymentGateway = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-numeric input for cardNumber and CVV
    if ((name === "cardNumber" || name === "cvv") && isNaN(value)) {
      return;
    }

    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Validate card details
  const validateCardDetails = () => {
    const { cardNumber, cardHolder, expiryDate, cvv } = cardDetails;

    if (!cardNumber || cardNumber.length !== 16) {
      alert("Please enter a valid 16-digit card number.");
      return false;
    }
    if (!cardHolder.trim()) {
      alert("Please enter the card holder's name.");
      return false;
    }
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      alert("Please enter a valid expiry date in MM/YY format.");
      return false;
    }
    if (!cvv || cvv.length !== 3) {
      alert("Please enter a valid 3-digit CVV.");
      return false;
    }

    return true;
  };

  // Handle payment processing
  const handlePayment = () => {
    if (!validateCardDetails()) {
      return;
    }

    // Simulate payment processing
    alert("Processing payment...");
    setTimeout(() => {
      alert("Payment successful! Your order has been placed.");
      window.location.href = "/order-history"; // Redirect to the order history page
    }, 200); // Simulate a 2-second delay for the payment process
  };

  return (
    <div className="payment-container">
      <h2>Payment Gateway</h2>
      <div className="payment-form">
        {/* Card Number Input */}
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number (16 digits)"
          value={cardDetails.cardNumber}
          onChange={handleInputChange}
          maxLength={16}
        />

        {/* Card Holder Name Input */}
        <input
          type="text"
          name="cardHolder"
          placeholder="Card Holder Name"
          value={cardDetails.cardHolder}
          onChange={handleInputChange}
        />

        {/* Expiry Date Input */}
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={cardDetails.expiryDate}
          onChange={handleInputChange}
          maxLength={5}
        />

        {/* CVV Input */}
        <input
          type="password"
          name="cvv"
          placeholder="CVV (3 digits)"
          value={cardDetails.cvv}
          onChange={handleInputChange}
          maxLength={3}
        />

        {/* Pay Now Button */}
        <button onClick={handlePayment} className="payment-button">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;