import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AddProductForm.css";

const EditProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });
    const [loading, setLoading] = useState(true);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/products/${id}`
                );
                const productData = response.data;
                setProduct({
                    name: productData.name || "",
                    description: productData.description || "",
                    price: productData.price || "",
                    category: productData.category || "",
                    image: null,
                });
                setCurrentImageUrl(productData.imageUrl || "");
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product:", error);
                alert("Error loading product!");
                navigate("/shop");
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("category", product.category);
        if (product.image) {
            formData.append("image", product.image);
        }

        try {
            const response = await axios.put(
                `http://localhost:5000/products/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            alert("Product updated successfully!");
            navigate("/shop");
        } catch (error) {
            console.error("Failed to update product:", error);
            if (error.response?.status === 403) {
                alert("Access denied. Admin privileges required.");
            } else {
                alert("Error updating product!");
            }
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="form-control"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Category</option>
                        <option value="baked">Patiserie</option>
                        <option value="vegan">Produse de post</option>
                    </select>
                </div>
                {currentImageUrl && (
                    <div className="mb-3">
                        <label className="form-label">Current Image</label>
                        <br />
                        <img
                            src={
                                currentImageUrl.startsWith("http")
                                    ? currentImageUrl
                                    : `http://localhost:5000/${currentImageUrl}`
                            }
                            alt="Current product"
                            style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        {currentImageUrl
                            ? "Change Product Image (optional)"
                            : "Product Image"}
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">
                    Update Product
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/shop")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditProductForm;

