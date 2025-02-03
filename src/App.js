import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Header from "./componets/Header";
import Contact from "./componets/Contact";
import Cart from "./componets/Cart";
import PageNotFount from "./componets/PageNotFound";
import Footer from "./componets/Footer";
import HeaderTwo from "./componets/HeaderTwo";
import Home from "./componets/Home";
import Login from "./componets/Login";
import Account from "./componets/Account";
import { ProductDetails } from "./componets/ProductDetails";
import Confirmation from './componets/Confirmation.jsx';
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "./feautres/cartSlice.js";
import { selectDarkMode } from "./feautres/themeSlice.js";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts()); // Fetch products on page load
  }, [dispatch]);

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); // Enable dark mode
    } else {
      document.documentElement.classList.remove("dark"); // Disable dark mode
    }
  }, [darkMode]);


  return (
    <Router>
       <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <HeaderTwo />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/Card" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFount />} />
        <Route path="/account" element={<Account />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
