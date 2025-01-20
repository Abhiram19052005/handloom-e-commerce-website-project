import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./pages/LoginForm";
import Signup from "./pages/SignupForm";
import PublicProductList from "./pages/PublicProductList";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import PaymentGateway from "./pages/PaymentGateway"; // Import PaymentGateway component
import AdminOrders from "./pages/AdminOrder";
import AdminDashboard from "./pages/AdminDashboard";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProfileUpdate from "./pages/ProfileUpdate"; // Import ProfileUpdate component
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<PublicProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />

        {/* User-Specific Routes */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/update"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <ProfileUpdate userType="user" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-history"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        {/* Artisan-Specific Routes */}
        <Route
          path="/artisan/profile/update"
          element={
            <ProtectedRoute allowedRoles={["ARTISAN"]}>
              <ProfileUpdate userType="artisan" />
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

        {/* Admin-Specific Routes */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/confirm-payment"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminOrders />
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