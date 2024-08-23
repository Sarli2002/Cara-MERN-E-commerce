import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import "./App.css"; 
import Shop from "./Pages/Shop/Shop";
import Product from "./Pages/Product";
import Footer from "./components/Footer/Footer";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignUp/LoginSignup"
export const backend_url = "https://cara-mern-e-commerce.onrender.com";
export const currency = '$';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
