import React, { useState } from "react";
import axios from "../api/axiosConfig";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/login" : "/signup";
    try {
      const response = await axios.post(url, formData);
      alert(response.data);
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
};

export default AuthPage;