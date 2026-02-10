import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  if (!token) {
    alert("Login required to create product");
    navigate("/login");
    return null;
  }

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/products",
        { name, price, description, category, brand, countInStock },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Product created!");
      console.log(response.data);

      // Redirect to product list
      navigate("/products");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Product creation failed!");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input type="number" placeholder="Stock Count" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
        <button type="submit" style={{ padding: "10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px" }}>Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreate;
