import axios from "axios";

const BASE_URL = "http://localhost:8081/api/cart";

/**
 * Add a product to the cart by product name.
 * @param {string} email - User's email.
 * @param {string} productName - Name of the product to add.
 * @returns {Promise} - A promise resolving to the updated cart data.
 */
export const addToCart = async (email, productName) => {
  if (!email) {
    throw new Error("User email is required to add to cart.");
  }
  if (!productName) {
    throw new Error("Product name is required to add to cart.");
  }

  try {
    const response = await axios.post(`${BASE_URL}/${email}/add`, null, {
      params: { productName },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
    throw new Error("Failed to add product to cart. Please try again.");
  }
};

/**
 * Get all cart items for a user by email.
 * @param {string} email - User's email.
 * @returns {Promise} - A promise resolving to the cart items.
 */
export const getCartItems = async (email) => {
  if (!email) {
    throw new Error("User email is required to fetch cart items.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error.response?.data || error.message);
    throw new Error("Failed to fetch cart items. Please try again.");
  }
};

/**
 * Remove a product from the cart by product name.
 * @param {string} email - User's email.
 * @param {string} productName - Name of the product to remove.
 * @returns {Promise} - A promise resolving to the updated cart data.
 */
export const removeFromCart = async (email, productName) => {
  if (!email) {
    throw new Error("User email is required to remove from cart.");
  }
  if (!productName) {
    throw new Error("Product name is required to remove from cart.");
  }

  try {
    const response = await axios.delete(`${BASE_URL}/${email}/remove`, {
      params: { productName },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error.response?.data || error.message);
    throw new Error("Failed to remove product from cart. Please try again.");
  }
};

/**
 * Update the quantity of a product in the cart.
 * @param {string} email - User's email.
 * @param {string} productName - Name of the product to update.
 * @param {number} quantity - New quantity for the product.
 * @returns {Promise} - A promise resolving to the updated cart data.
 */
export const updateCartQuantity = async (email, productName, quantity) => {
  if (!email) {
    throw new Error("User email is required to update cart.");
  }
  if (!productName) {
    throw new Error("Product name is required to update cart.");
  }
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  try {
    const response = await axios.put(`${BASE_URL}/${email}/update`, null, {
      params: { productName, quantity },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error.response?.data || error.message);
    throw new Error("Failed to update cart quantity. Please try again.");
  }
};