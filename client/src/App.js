import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

// Importează componentele paginilor
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <nav>
          {/* Link-uri pentru navigare */}
          <Link to="/">Home</Link> | 
          <Link to="/shop">Shop</Link> | 
          <Link to="/cart">Cart</Link> | 
          <Link to="/account">My Account</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/signup">Sign Up</Link>
        </nav>

        {/* Definirea rutelor */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* Adaugă aici alte rute dacă este necesar */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
