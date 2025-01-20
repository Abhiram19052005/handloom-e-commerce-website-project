import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const ArtisanProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const email = localStorage.getItem("email");
      try {
        const response = await axios.get(
          'http://localhost:8081/api/products/owned?email=${email}'
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        'http://localhost:8081/api/products/update',
        selectedProduct
      );
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div>
      <h2>Your Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => setSelectedProduct(product)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <form onSubmit={handleUpdateProduct}>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={selectedProduct.name}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, name: e.target.value })
            }
          />
          <textarea
            value={selectedProduct.description}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                description: e.target.value,
              })
            }
          ></textarea>
          <input
            type="number"
            value={selectedProduct.price}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, price: e.target.value })
            }
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default ArtisanProductManagement;