import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.role === "ARTISAN" && !response.data.isApproved) {
        setError("Your account is pending approval.");
      } else {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        if (response.data.role === "ADMIN") {
          window.location.href = "/dashboard/admin";
        } else if (response.data.role === "ARTISAN") {
          window.location.href = "/dashboard/artisan";
        } else {
          window.location.href = "/products";
        }
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;