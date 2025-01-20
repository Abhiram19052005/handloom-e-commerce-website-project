import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import PublicProductList from "./pages/PublicProductList";
import Login from "./pages/LoginForm";
import Signup from "./pages/SignupForm";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import axios from "axios";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items when the app loads or the user changes
  useEffect(() => {
    const fetchCartItems = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;

      try {
        const response = await axios.get(`http://localhost:8081/api/cart/${email}`);
        setCartItems(response.data || []); // Ensure backend returns cart items array
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Add a product to the cart by product name
  const handleAddToCart = async (productName) => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8081/api/cart/${email}/add`, null, {
        params: { productName },
      });
      setCartItems(response.data.items || []); // Update cart items with response
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  // Update the quantity of a product in the cart
  const handleUpdateCart = async (productName, quantity) => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please log in to update cart items.");
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:8081/api/cart/${email}/update',
        null,
        { params: { productName, quantity } }
      );
      setCartItems(response.data.items || []); // Update cart items with response
    } catch (error) {
      console.error("Error updating cart item:", error.response?.data || error.message);
      alert("Failed to update cart item. Please try again.");
    }
  };

  // Remove a product from the cart by product name
  const handleRemoveFromCart = async (productName) => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please log in to remove items from the cart.");
      return;
    }

    try {
      const response = await axios.delete(
        'http://localhost:8081/api/cart/${email}/remove',
        { params: { productName } }
      );
      setCartItems(response.data.items || []); // Update cart items with response
    } catch (error) {
      console.error("Error removing cart item:", error.response?.data || error.message);
      alert("Failed to remove product from cart. Please try again.");
    }
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products"
          element={<PublicProductList onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateCart}
              onRemoveItem={handleRemoveFromCart}
            />
          }
        />
        {/* Protected Routes */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/artisan"
          element={
            <ProtectedRoute allowedRoles={["ARTISAN"]}>
              <ArtisanDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<p>404: Page Not Found</p>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;