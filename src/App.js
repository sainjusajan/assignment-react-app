import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Homepage from "./pages/Homepage";

import CheckoutPage from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetail";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
