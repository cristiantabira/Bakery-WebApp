import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth } from "../services/AuthContext";
import "../styles/Header.css";
import { CSSTransition } from "react-transition-group";

export default function Header() {
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navRef = useRef(null);
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

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

    console.log("User: ", user);
    console.log("IsAuthenticated: ", isAuthenticated);

    return (
        <header className="Header">
            <Container>
                <img
                    src={require("../assets/logoBun.webp")}
                    className="Logo"
                    alt="logo"
                />
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
                        <Link to="/">Home</Link>
                        <Link to="/map">Map of Romanian Traditions</Link>
                        <Link to="/shop">Shop</Link>
                        <Link to="/cart">Cart</Link>
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/account">My Account</Link>
                                {isAdmin && (
                                    <Link to="/admin/users">Manage Users</Link>
                                )}
                                <button
                                    className="logout-button"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </nav>
                </CSSTransition>
            </Container>
        </header>
    );
}
