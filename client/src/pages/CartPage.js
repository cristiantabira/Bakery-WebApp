import React, { useEffect, useState, useContext } from "react";
import "../styles/CartPage.css";
import axios from "axios";
import AuthContext from "../services/AuthContext";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    // const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("http://localhost:5000/cart", {
                    withCredentials: true,
                });
                setCartItems(response.data.Products);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const getTotalPrice = () => {
        return cartItems
            .reduce(
                (total, item) =>
                    total + item.CartProducts.quantity * item.price,
                0
            )
            .toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="item-details">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">
                                Quantity: {item.CartProducts.quantity}
                            </span>
                            <span className="item-price">
                                RON {item.price.toFixed(2)} buc
                            </span>
                        </div>
                        <div className="item-total-price">
                            Total: RON{" "}
                            {(item.CartProducts.quantity * item.price).toFixed(
                                2
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <h3>Total Price: RON {getTotalPrice()}</h3>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
        </div>
    );
};

export default CartPage;
