import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth } from "../services/AuthContext";
import "../styles/Header.css";
import { CSSTransition } from "react-transition-group";

export default function Header() {
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navRef = useRef(null);
    const { user, logout } = useAuth();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => mediaQuery.removeListener(handleMediaQueryChange);
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        setIsSmallScreen(mediaQuery.matches);
    };

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    return (
        <header className="Header">
            <Container>
                <button onClick={toggleNav} className="Burger">
                    🍰
                </button>
                <CSSTransition
                    in={!isSmallScreen || isNavVisible}
                    timeout={350}
                    classNames="NavAnimation"
                    unmountOnExit
                    nodeRef={navRef}
                >
                    <nav
                        ref={navRef}
                        className={`Nav ${
                            !isSmallScreen || isNavVisible ? "show" : ""
                        }`}
                    >
                        <img
                            src={require("../assets/logoBun.webp")}
                            className="Logo"
                            alt="logo"
                        />
                        <Link to="/">Home</Link>
                        <Link to="/map">Harta Copilariei</Link>
                        <Link to="/shop">Shop</Link>
                        <Link to="/cart">Cart</Link>
                        {!user ? (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/account">My Account</Link>
                                <span>Welcome, {user.name}</span>
                                <button onClick={logout}>Logout</button>
                                {user.role === "admin" && (
                                    <Link to="/products/add">CMS</Link>
                                )}
                            </>
                        )}
                    </nav>
                </CSSTransition>
            </Container>
        </header>
    );
}
