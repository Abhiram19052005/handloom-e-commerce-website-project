import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PublicProductList.css";

const PublicProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/products/approved");
        setProducts(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/cart-orders/cart/add", null, {
        params: {
          email: email,
          productName: product.name,
          productDescription: product.description,
          productPrice: product.price,
          quantity: 1,
        },
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add product to cart.");
    }
  };

  const handleDirectBuy = async (product) => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/cart-orders/cart/direct-buy", null, {
        params: { email, productName: product.name, quantity: 1, paymentMethod: "COD" },
      });
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Failed to place order.");
    }
  };

  if (loading) {
    return <p className="loading-message">Loading products...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="public-product-list">
      <h2>Available Products</h2>
      {products.length === 0 ? (
        <p className="no-products-message">No products available at the moment.</p>
      ) : (
        <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.image && (
              <img
                src={`http://localhost:8081/api/products/image/${product.id}`}
                alt={product.name}
                className="product-image"
              />
            )}
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">
              Price: ${product.price ? product.price.toFixed(2) : "N/A"}
            </p>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                Add to Cart
              </button>
              <button onClick={() => handleDirectBuy(product)} className="buy-now-button">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicProductList;