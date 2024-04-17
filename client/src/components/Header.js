import React, { useState, useEffect, useRef } from "react";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\Header.css";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Header() {
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        const handleMediaQueryChange = (mediaQuery) => {
            setIsSmallScreen(mediaQuery.matches);
        };

        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => mediaQuery.removeListener(handleMediaQueryChange);
    }, []);

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    return (
        <header className="Header">
            <Container>
                <button onClick={toggleNav} className="Burger">
                    🎂
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
                        <Link to="/shop">Shop</Link>
                        <Link to="/account">My Account</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/products/add">CMS</Link>
                    </nav>
                </CSSTransition>
            </Container>
        </header>
    );
}
