import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ShopPage.css";
import axios from "axios";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/products"
                );
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const addToCart = async (productId) => {
        try {
            const quantityInput = document.getElementById(
                `quantity-${productId}`
            );
            const quantity = quantityInput
                ? parseInt(quantityInput.value, 10)
                : 1;

            const productResponse = await axios.get(
                `http://localhost:5000/products/${productId}`
            );

            const response = await axios.post(
                "http://localhost:5000/cart/addProduct",
                {
                    productId,
                    quantity: quantity,
                    price: productResponse.data.price,
                },
                { withCredentials: true }
            );
            // alert("Product added to cart");
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome to Our Bakery Shop</h1>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="row">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    >
                        <div className="card">
                            <img
                                src={
                                    product.imageUrl ||
                                    "http://localhost:5000/uploads/briosa.jpg"
                                }
                                alt={product.name}
                                className="card-img-top"
                                style={{
                                    height: "200px",
                                    width: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">
                                    {product.price.toFixed(2)} RON
                                </p>
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                    className="form-control quantity-input"
                                    id={`quantity-${product.id}`}
                                />
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="btn btn-primary mt-2"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
