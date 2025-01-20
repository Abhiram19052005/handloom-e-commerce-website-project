import React, { useState, useEffect } from "react";
import "../styles/home.css"; // Ensure this CSS file styles both slideshow and product sections

// Import images for the slideshow
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";

// Import PublicProductList to display products
import PublicProductList from "../pages/PublicProductList";

const Home = () => {
  const images = [image1, image2, image3]; // Slideshow images
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [images.length]);

  return (
    <div className="home-container">
      {/* Slideshow Section */}
      <div className="slideshow-container">
        <img 
          src={images[currentImage]} 
          alt="Slideshow" 
          className="slideshow-image" 
        />
      </div>

      {/* Product List Section */}
      <div className="product-list-section">
        <PublicProductList />
      </div>
    </div>
  );
};

export default Home;
