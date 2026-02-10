import React, { useEffect, useState } from "react";
import API from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to fetch products");
    }
  };

  // Delete a product (protected)
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required to delete product");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product deleted!");
      fetchProducts(); // Refresh list after delete
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      {products.length === 0 && <p>No products found</p>}
      {products.map((product) => (
        <div
          key={product._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Stock: {product.countInStock}</p>
          <button
            onClick={() => handleDelete(product._id)}
            style={{ backgroundColor: "red", color: "white", padding: "5px 10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
