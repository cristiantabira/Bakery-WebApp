import React, { useState, useEffect, useRef } from "react";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\Header.css";
import { CSSTransition } from "react-transition-group";
import { Link } from 'react-router-dom';


export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
      <img src={require("../assets/logo.png")} className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
        nodeRef={navRef} 
      >
        <nav ref={navRef} className="Nav"> 
          <Link to="/">Home</Link> 
          <Link to="/shop">Shop</Link>  
          <Link to="/account">My Account</Link> 
          <Link to="/cart">Cart</Link> 
          <Link to="/login">Login</Link> 
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🎂
      </button>
    </header>
  );
}
