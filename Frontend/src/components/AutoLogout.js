import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = ({ children }) => {
  const navigate = useNavigate();
  let logoutTimer;

  // Function to handle logout
  const handleLogout = () => {
    alert("You have been logged out due to inactivity.");
    localStorage.clear(); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(handleLogout, 60000); // Set timeout for 1 minute
  };

  useEffect(() => {
    // Attach event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Initialize timer
    resetTimer();

    // Cleanup event listeners on component unmount
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  return <>{children}</>;
};

export default AutoLogout;