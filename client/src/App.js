import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BakerPage from "./pages/BakerCMS";
import MapPage from "./pages/MapPage";
import { AuthProvider } from "./services/AuthContext";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-wrapper">
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/shop" element={<ShopPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/account" element={<AccountPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/map" element={<MapPage />} />
                            <Route
                                path="/products/add"
                                element={<BakerPage />}
                            />
                            <Route
                                path="/checkout"
                                element={<CheckoutPage />}
                            />
                        </Routes>
                    </div>
                    <Footer className="footer" />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
