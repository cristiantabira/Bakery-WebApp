import React, { useState, useEffect } from "react";
import "../styles/CheckoutPage.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndCart = async () => {
            try {
                const userResponse = await axios.get(
                    "http://localhost:5000/account/profile",
                    {
                        withCredentials: true,
                    }
                );

                const cartResponse = await axios.get(
                    "http://localhost:5000/cart/getCart",
                    {
                        withCredentials: true,
                    }
                );

                const userData = userResponse.data;
                const cartData = cartResponse.data.cartProducts || [];

                setUser(userData);
                setCartItems(cartData);
                setTotalPrice(
                    cartData.reduce(
                        (total, item) => total + item.quantity * item.price,
                        0
                    )
                );

                if (userData) {
                    setValue("name", userData.name);
                    setValue("email", userData.email);
                }
            } catch (error) {
                console.error("Error fetching user or cart data:", error);
            }
        };

        fetchUserAndCart();
    }, [setValue]);

    const formatCardNumber = (value) => {
        return value
            .replace(/\s?/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
    };

    const onSubmit = async (data) => {
        if (data.paymentMethod === "card") {
            if (data.cardNumber.length !== 19 || data.cvv.length !== 3) {
                alert("Invalid card details");
                return;
            }
        }

        // Create order
        const orderData = {
            userId: user ? user.id : null,
            sessionId: user ? null : document.cookie.split("=")[1],
            details: {
                address: data.address,
                city: data.city,
                state: data.state,
                zip: data.zip,
                phone: data.phone,
                paymentMethod: data.paymentMethod,
                cardNumber:
                    data.paymentMethod === "card"
                        ? data.cardNumber.replace(/\s+/g, "")
                        : null,
                cardName: data.paymentMethod === "card" ? data.cardName : null,
                cvv: data.paymentMethod === "card" ? data.cvv : null,
            },
            total: totalPrice,
            status: "pending",
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/orders",
                orderData,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // Clear the cart
                await axios.delete("http://localhost:5000/cart/clear", {
                    withCredentials: true,
                });

                alert("Order placed successfully!");
                navigate("/orders");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-container">
                <h1 className="checkout-title">Checkout</h1>
                <p>
                    No items in the cart. Please add items to the cart before
                    checking out.
                </p>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>
            <div className="cart-summary">
                <h2>Order Summary</h2>
                {cartItems.map((item) => (
                    <div key={item.productId} className="cart-item">
                        <img
                            src={`http://localhost:5000/${item.product.imageUrl}`}
                            alt={item.product.name}
                            className="product-image"
                        />
                        <div className="item-details">
                            <span className="item-name">
                                {item.product.name}
                            </span>
                            <span className="item-quantity">
                                Quantity: {item.quantity}
                            </span>
                            <span className="item-price">
                                RON {item.price.toFixed(2)} buc
                            </span>
                            <div className="item-total-price">
                                Total: RON{" "}
                                {(item.quantity * item.price).toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
                <h3 className="total-price">
                    Total Price: RON {totalPrice.toFixed(2)}
                </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
                <h2>Billing Details</h2>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                )}

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                )}

                <label>Phone</label>
                <input
                    type="text"
                    name="phone"
                    {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                    <p className="error-message">{errors.phone.message}</p>
                )}

                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    {...register("address", {
                        required: "Address is required",
                    })}
                />
                {errors.address && (
                    <p className="error-message">{errors.address.message}</p>
                )}

                <label>City</label>
                <input
                    type="text"
                    name="city"
                    {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                    <p className="error-message">{errors.city.message}</p>
                )}

                <label>State</label>
                <input
                    type="text"
                    name="state"
                    {...register("state", { required: "State is required" })}
                />
                {errors.state && (
                    <p className="error-message">{errors.state.message}</p>
                )}

                <label>Zip</label>
                <input
                    type="text"
                    name="zip"
                    {...register("zip", { required: "Zip is required" })}
                />
                {errors.zip && (
                    <p className="error-message">{errors.zip.message}</p>
                )}

                <h2>Payment Details</h2>
                <div className="radio-group">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="delivery"
                        {...register("paymentMethod", {
                            required: "Payment method is required",
                        })}
                    />
                    <label>Pay at Delivery</label>
                </div>
                <div className="radio-group">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        {...register("paymentMethod", {
                            required: "Payment method is required",
                        })}
                    />
                    <label>Pay with Card</label>
                </div>
                {errors.paymentMethod && (
                    <p className="error-message">
                        {errors.paymentMethod.message}
                    </p>
                )}

                {watch("paymentMethod") === "card" && (
                    <div className="card-details">
                        <div>
                            <label>Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                {...register("cardNumber", {
                                    required: "Card number is required",
                                    minLength: {
                                        value: 19,
                                        message:
                                            "Card number must be 16 digits",
                                    },
                                    maxLength: {
                                        value: 19,
                                        message:
                                            "Card number must be 16 digits",
                                    },
                                })}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    e.target.value = formatCardNumber(value);
                                }}
                            />
                            {errors.cardNumber && (
                                <p className="error-message">
                                    {errors.cardNumber.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>Card Name</label>
                            <input
                                type="text"
                                name="cardName"
                                {...register("cardName", {
                                    required: "Card name is required",
                                })}
                            />
                            {errors.cardName && (
                                <p className="error-message">
                                    {errors.cardName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                {...register("cvv", {
                                    required: "CVV is required",
                                    minLength: {
                                        value: 3,
                                        message: "CVV must be 3 digits",
                                    },
                                    maxLength: {
                                        value: 3,
                                        message: "CVV must be 3 digits",
                                    },
                                })}
                            />
                            {errors.cvv && (
                                <p className="error-message">
                                    {errors.cvv.message}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <button type="submit" className="submit-button">
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
