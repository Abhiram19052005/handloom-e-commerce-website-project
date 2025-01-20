import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users"); // "users" or "products"

  // Fetch users and products
  useEffect(() => {
    const fetchUsers = axios.get("http://localhost:8081/api/auth/admin/users");
    const fetchProducts = axios.get("http://localhost:8081/api/products/all");

    Promise.all([fetchUsers, fetchProducts])
      .then(([userResponse, productResponse]) => {
        setUsers(userResponse.data);
        setProducts(productResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Approve Artisan
  const handleApproveUser = (userId) => {
    axios
      .put(`http://localhost:8081/api/auth/admin/users/approve-artisan?id=${userId}`)
      .then(() => {
        alert("Artisan approved!");
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, isApproved: true } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error approving Artisan:", error);
        alert("Error approving Artisan.");
      });
  };

  // Approve Product
  const handleApproveProduct = (productId) => {
    axios
      .put(`http://localhost:8081/api/products/approve?id=${productId}`)
      .then(() => {
        alert("Product approved!");
        setProducts(
          products.map((product) =>
            product.id === productId ? { ...product, isApproved: true } : product
          )
        );
      })
      .catch((error) => {
        console.error("Error approving product:", error);
        alert("Error approving product.");
      });
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="admin-navigation">
        <button
          className={activeTab === "users" ? "active-tab" : ""}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
        <button
          className={activeTab === "products" ? "active-tab" : ""}
          onClick={() => setActiveTab("products")}
        >
          Product Management
        </button>
        <button
          onClick={() => (window.location.href = "/admin/orders")}
          className="navigate-orders"
        >
          Manage Orders
        </button>
      </div>

      {activeTab === "users" && (
        <div className="user-management">
          <h3>User Management</h3>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isApproved ? "Approved" : "Pending"}</td>
                  <td>
                    {user.role === "ARTISAN" && !user.isApproved && (
                      <button onClick={() => handleApproveUser(user.id)}>
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "products" && (
        <div className="product-management">
          <h3>Product Management</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.isApproved ? "Approved" : "Pending"}</td>
                  <td>
                    {!product.isApproved && (
                      <button onClick={() => handleApproveProduct(product.id)}>
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;