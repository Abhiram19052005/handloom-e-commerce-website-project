import React, { useState } from "react";
import axios from "axios";
import "../styles/signupform.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    address: "",
    role: "USER", // Default role
    username: "",
    workType: "",
    description: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      validatePassword(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate password strength
  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCheck = /[!@#$%^&*]/.test(password);

    if (lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck) {
      setPasswordStrength("Strong");
    } else if (lengthCheck && upperCheck && numberCheck) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    if (passwordStrength === "Weak") {
      setError("Please use a stronger password.");
      setMessage("");
      return;
    }

    // Prepare user data for API
    const userData = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      name: formData.name,
      username: formData.username || formData.email, // Default username if not provided
      phone: formData.phone,
      address: formData.address,
      workType: formData.role === "ARTISAN" ? formData.workType : null,
      description: formData.role === "ARTISAN" ? formData.description : null,
    };

    try {
      // Send data to the signup API
      await axios.post("http://localhost:8081/api/auth/signup", userData);

      // Set success message and clear form
      setMessage(
        `User created successfully. ${
          formData.role === "ARTISAN"
            ? "Please wait for admin approval."
            : "You can now log in."
        }`
      );
      setError("");
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
        address: "",
        role: "USER",
        username: "",
        workType: "",
        description: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Error during signup. Please try again.");
      setMessage("");
    }
  };
  return (
    <div className="signup-form-container">
      <h2>Signup Form</h2>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Password Strength: {passwordStrength || "Weak"}
          </p>
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ARTISAN">Artisan</option>
          </select>
        </div>
        {formData.role === "ARTISAN" && (
          <>
            <div className="form-group">
              <label>Work Type:</label>
              <input
                type="text"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                placeholder="Work Type (e.g., Weaving, Embroidery)"
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your work"
                required
              ></textarea>
            </div>
          </>
        )}
        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;