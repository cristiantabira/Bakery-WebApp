import React, { useEffect, useState } from "react";
import "../styles/CartPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartId, setCartId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/cart/getCart",
                    {
                        withCredentials: true,
                    }
                );

                const cartData = response.data || {};
                setCartItems(cartData.cartProducts || []);
                setCartId(cartData.id || null);
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setCartItems([]);
                    setCartId(null);
                } else {
                    setError(error.message);
                }
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = async (cartProductId, productId, quantity) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/cart/updateProduct/${cartId}/${productId}`,
                { quantity },
                {
                    withCredentials: true,
                }
            );

            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.cartId === cartId && item.productId === productId
                        ? {
                              ...item,
                              quantity: response.data.quantity,
                              subtotal: response.data.subtotal,
                          }
                        : item
                )
            );
        } catch (error) {
            console.error("Error updating product quantity:", error);
            setError(error.message);
        }
    };

    const handleRemoveProduct = async (productId) => {
        try {
            await axios.delete(
                `http://localhost:5000/cart/removeProduct/${cartId}/${productId}`,
                {
                    withCredentials: true,
                }
            );

            setCartItems((prevItems) =>
                prevItems.filter((item) => item.productId !== productId)
            );
        } catch (error) {
            console.error("Error removing product from cart:", error);
            setError(error.message);
        }
    };

    const getTotalPrice = () => {
        return cartItems
            .reduce((total, item) => total + item.quantity * item.price, 0)
            .toFixed(2);
    };

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            navigate("/checkout");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.productId} className="cart-item">
                            <div className="item-details">
                                <img
                                    src={`http://localhost:5000/${item.product.imageUrl}`}
                                    alt={item.product.name}
                                    className="product-image"
                                />
                                <span className="item-name">
                                    {item.product.name}
                                </span>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            item.cartId,
                                            item.productId,
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="form-control quantity-input"
                                />
                                <span className="item-price">
                                    RON {item.price.toFixed(2)} buc
                                </span>
                                <button
                                    onClick={() =>
                                        handleRemoveProduct(item.productId)
                                    }
                                    className="btn btn-danger"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="item-total-price">
                                Total: RON{" "}
                                {(item.quantity * item.price).toFixed(2)}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items in the cart</p>
                )}
            </div>
            <div className="cart-total">
                <h3>Total Price: RON {getTotalPrice()}</h3>
            </div>
            <button
                className={`checkout-button ${
                    cartItems.length === 0 ? "disabled" : ""
                }`}
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartPage;
