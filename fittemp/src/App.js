import React from "react";
import products from "./data/Products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Product Ratings & Reviews</h1>
      <div className="product-grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

export default App;
