import React, { useState, useContext } from "react";
import axios from "axios";
import "./PetMatch.css";
import { StoreContext } from '../../Context/StoreContext';

const PetMatch = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { url } = useContext(StoreContext);

  const cleanBreedNames = (breeds) => {
    return breeds
      .map((breed) => breed.trim().toLowerCase()) 
      .filter((breed) => breed.length > 1);
  };  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      // Detect breed(s) from your backend
      const response = await axios.post(`${url}/api/detect/predict`, formData, { 
        headers: { "Content-Type": "multipart/form-data" },
      });

      let detectedBreeds = cleanBreedNames(response.data.breeds || []);
      setBreeds(detectedBreeds);

      if (detectedBreeds.length === 0) {
        setProducts([]);
        alert("No breed detected. Try another image.");
        return;
      }

      // 🛒 Fetch products for all detected breeds at once using query parameter
      const breedQuery = detectedBreeds.join(","); // comma-separated
      const productsRes = await axios.get(`${url}/api/food/by-breed?breeds=${encodeURIComponent(breedQuery)}`);
      setProducts(productsRes.data.data || []);

    } catch (error) {
      console.error("Error detecting breed or fetching products:", error);
      alert("Failed to detect breed or fetch products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="petmatch-container">
      <h1 className="petmatch-title">Find the Best Products for Your Pet</h1>

      {/* 🏷️ Upload Section */}
      <div className="upload-section">
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} hidden />
        <label htmlFor="file-upload" className="upload-label">Choose File</label>

        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button className="upload-button" onClick={handleUpload} disabled={loading}>
          {loading ? "Detecting..." : "Detect Breed"}
        </button>
      </div>

      {/* 🐶 Detected Breed Name */}
      {breeds.length > 0 && (
        <h2 className="breed-result">
          Detected Breed{breeds.length > 1 ? "s" : ""}: <strong>{breeds.join(", ")}</strong>
        </h2>
      )}

      {/* 🛍️ Recommended Products */}
      <div className="products-section">
        {products.length > 0 ? (
          <div className="product-list">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img 
  src={product.image.startsWith("http") ? product.image : `http://localhost:4000/images/${product.image}`}
  alt={product.name} 
  className="product-image"
/>

                <h3 className="product-name">{product.name}</h3>
                <p className="product-price"><strong>AED{product.price}</strong></p>
              </div>
            ))}
          </div>
        ) : (
          breeds.length > 0 && <p className="no-products">No products found for these breeds.</p>
        )}
      </div>
    </div>
  );
};

export default PetMatch;
