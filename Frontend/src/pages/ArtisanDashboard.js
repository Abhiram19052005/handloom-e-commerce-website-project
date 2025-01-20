import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/ArtisanDashboard.css'

const ArtisanDashboard = () => {
  const [artisanDetails, setArtisanDetails] = useState({});
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch artisan details
    axios
      .get("http://localhost:8081/api/auth/admin/users")
      .then((response) => {
        const artisan = response.data.find(
          (user) => user.role === "ARTISAN" && user.isApproved
        );
        setArtisanDetails(artisan || {});
      })
      .catch((error) => console.error("Error fetching artisan details:", error));
  }, []);

  // Fetch products uploaded by artisan
  useEffect(() => {
    if (artisanDetails.email) {
      axios
        .get("http://localhost:8081/api/products/all")
        .then((response) => {
          const artisanProducts = response.data.filter(
            (product) => product.uploadedBy === artisanDetails.email
          );
          setProducts(artisanProducts);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [artisanDetails.email]);



  // Handle product upload
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("image", productData.image);
    formData.append("uploadedBy", artisanDetails.email);

    try {
      await axios.post("http://localhost:8081/api/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product uploaded successfully!");
      setProductData({
        name: "",
        description: "",
        price: "",
        image: null,
      });
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product.");
    }
  };

  return (
    <div>
      <h2>Artisan Dashboard</h2>

      <form onSubmit={handleProductSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) =>
            setProductData({ ...productData, name: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          onChange={(e) =>
            setProductData({ ...productData, price: e.target.value })
          }
        />
        <input
          type="file"
          onChange={(e) =>
            setProductData({ ...productData, image: e.target.files[0] })
          }
        />
        <button type="submit">Upload Product</button>
      </form>



      <h3>Your Products</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={`http://localhost:8081/api/products/image/${product.id}`}
                  alt={product.name}
                  style={{ width: "100px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtisanDashboard;