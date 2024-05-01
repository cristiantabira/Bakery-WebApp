import React, { useState } from "react";
import axios from "axios";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\AddProductForm.css";

const AddProductForm = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("products/add", product);
            alert("Product added successfully!");
            setProduct({
                name: "",
                price: "",
            });
        } catch (error) {
            console.error("Failed to add product:", error);
            alert("Error adding product!");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
