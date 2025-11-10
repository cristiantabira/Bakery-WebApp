import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ShopPage.css";
import axios from "axios";
import { useAuth } from "../services/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

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

    const handleEditProduct = (productId) => {
        navigate(`/products/edit/${productId}`);
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(
                    `http://localhost:5000/products/${productId}`,
                    { withCredentials: true }
                );
                // Remove product from state
                setProducts(products.filter((p) => p.id !== productId));
                alert("Product deleted successfully!");
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error deleting product. You may not have permission.");
            }
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <div className="shop-header">
                <h1 className="shop-title">Welcome to Our Bakery Shop</h1>
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for delicious treats..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
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
                                {isAdmin && (
                                    <div className="mt-2">
                                        <button
                                            onClick={() => handleEditProduct(product.id)}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {isAdmin && (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card add-product-card">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                                <h5 className="card-title mb-3">Add New Product</h5>
                                <p className="card-text text-center mb-4">
                                    Click here to add a new product to the shop
                                </p>
                                <Link
                                    to="/products/add"
                                    className="btn btn-primary btn-lg"
                                >
                                    + Add Product
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
