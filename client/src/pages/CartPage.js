import React, { useState } from "react";
import "../styles/CartPage.css";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Chocolate Croissant", quantity: 2, price: 3.5 },
        { id: 2, name: "Macaron", quantity: 6, price: 1.5 },
        { id: 3, name: "Tarta Fructe", quantity: 1, price: 4.0 },
    ]);

    const getTotalPrice = () => {
        return cartItems
            .reduce((total, item) => total + item.quantity * item.price, 0)
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
                                Quantity: {item.quantity}
                            </span>
                            <span className="item-price">
                                RON {item.price.toFixed(2)} buc
                            </span>
                        </div>
                        <div className="item-total-price">
                            Total: RON {(item.quantity * item.price).toFixed(2)}
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
