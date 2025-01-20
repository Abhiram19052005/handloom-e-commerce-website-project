import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faTshirt, faUserPlus, faSignInAlt, faSignOutAlt, faUserCog } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";

const Navbar = ({ cartItemCount }) => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Get user role from local storage
  const userRole = localStorage.getItem("role");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>
          <Link to="/" className="navbar-link">
            Handloom Fashion
          </Link>
        </h1>
      </div>
      <ul className="navbar-links">
        {/* Common Links */}
        <li>
          <Link to="/" className="navbar-link">
            <FontAwesomeIcon icon={faHome} /> <b>Home</b>
          </Link>
        </li>

        {/* Conditional Links Based on Role */}
        {userRole === "USER" && (
          <>
            <li>
              <Link to="/products" className="navbar-link">
                <FontAwesomeIcon icon={faTshirt} /> <b>Products</b>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="navbar-link">
                <FontAwesomeIcon icon={faShoppingCart} /> <b>Cart ({cartItemCount || 0})</b>
              </Link>
            </li>
          </>
        )}
        {userRole === "ARTISAN" && (
          <li>
            <Link to="/dashboard/artisan" className="navbar-link">
              <FontAwesomeIcon icon={faUserCog} /> <b>Artisan Dashboard</b>
            </Link>
          </li>
        )}
        {userRole === "ADMIN" && (
          <li>
            <Link to="/dashboard/admin" className="navbar-link">
              <FontAwesomeIcon icon={faUserCog} /> <b>Admin Dashboard</b>
            </Link>
          </li>
        )}

        {/* Auth Links */}
        {!userRole && (
          <>
            <li>
              <Link to="/login" className="navbar-link">
                <FontAwesomeIcon icon={faSignInAlt} /> <b>Login</b>
              </Link>
            </li>
            <li>
              <Link to="/signup" className="navbar-link">
                <FontAwesomeIcon icon={faUserPlus} /> <b>Signup</b>
              </Link>
            </li>
          </>
        )}

        {/* Logout Button for Authenticated Users */}
        {userRole && (
          <li>
            <button onClick={handleLogout} className="navbar-logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> <b>Logout</b>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
