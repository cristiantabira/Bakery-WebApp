import React, { useState } from "react";
import axios from "axios";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\AddProductForm.css";

const AddProductForm = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });

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
        formData.append("image", product.image); // Ensure the file is attached correctly

        try {
            const response = await axios.post(
                "http://localhost:5000/products/add",
                formData, // Pass formData instead of product object
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Product added successfully!");
            setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                image: null,
            });
        } catch (error) {
            console.error("Failed to add product:", error);
            alert("Error adding product!");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Product</h2>
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
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Product Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
