"use client"; // This marks the component as a Client Component (uses React hooks)

import { useState, useEffect } from "react";

/**
 * PROGRAM FLOW - FRONTEND COMPONENT
 * ==================================
 * 
 * INITIAL LOAD:
 * 1. Component mounts → useEffect runs → fetchProducts() called
 * 2. Frontend sends GET request to /api/products
 * 3. Server returns list of products
 * 4. Products displayed in the UI
 * 
 * ADD PRODUCT:
 * 1. User fills form and clicks "Add" button
 * 2. addProduct() triggered → POST request sent to /api/products
 * 3. Form data (name, price) sent in request body
 * 4. Server creates product and returns it
 * 5. Form clears, product list refreshes (fetchProducts called)
 * 
 * DELETE PRODUCT:
 * 1. User clicks "Delete" button on a product
 * 2. deleteProduct(id) triggered → DELETE request sent to /api/products?id=X
 * 3. Server removes the product
 * 4. Product list refreshes (fetchProducts called)
 */

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: Fetch all products when component first loads
  // [] = empty dependency array means this runs ONCE on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // STEP 2: Function to fetch all products from the server
  const fetchProducts = async () => {
    setLoading(true); // Show loading state
    try {
      // Send GET request to /api/products endpoint
      const response = await fetch("/api/products");
      const data = await response.json(); // Parse JSON response
      setProducts(data); // Update state with products
    } catch (error) {
      console.error("Error fetching products:", error); // Log any errors
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // STEP 3: Function to add a new product to the database
  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      // Send POST request with product data
      const response = await fetch("/api/products", {
        method: "POST", // Specify POST method for creation
        headers: { "Content-Type": "application/json" }, // Tell server we're sending JSON
        body: JSON.stringify({ name, price: parseFloat(price) }), // Send form data as JSON
      });

      if (response.ok) {
        setName(""); // Clear name input
        setPrice(""); // Clear price input
        fetchProducts(); // Refresh the list to show new product
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // STEP 4: Function to delete a product by its ID
  const deleteProduct = async (id: number) => {
    try {
      // Send DELETE request with product id as query parameter (?id=X)
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      fetchProducts(); // Refresh the list to remove deleted product
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Products API Example</h1>

      {/* Add Product Form */}
      <form onSubmit={addProduct} className="mb-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"
            className="w-32 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>

      {/* Products List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="space-y-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded"
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">${product.price}</p>
                </div>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
