import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/OrdersPage.css";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/account/orders",
                    { withCredentials: true }
                );
                setOrders(response.data.orders);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const parseDetails = (details) => {
        try {
            const parsedDetails = JSON.parse(details);
            const { client, products, address, paymentMethod } = parsedDetails;
            return (
                <div>
                    <p>
                        <strong>Client:</strong> {client}
                    </p>
                    <p>
                        <strong>Products:</strong>
                    </p>
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>
                                {product.productName} - Quantity:{" "}
                                {product.quantity} - Price: $
                                {product.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>
                        <strong>Address:</strong> {address}
                    </p>
                    <p>
                        <strong>Payment Method:</strong> {paymentMethod}
                    </p>
                </div>
            );
        } catch (error) {
            return <p>{details}</p>;
        }
    };

    return (
        <div className="orders-container">
            <h2>My Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <p>Order ID: {order.id}</p>
                            <p>
                                Date:{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p>Details:</p>
                            {parseDetails(order.details)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrdersPage;
