import React, { useState } from "react";
import axios from "axios";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\AddProductForm.css";

function AddProductForm() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in product) {
            formData.append(key, product[key]);
        }
        formData.append("image", file);

        try {
            const response = await axios.post("/api/products/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Product added successfully!");
            setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
            });
            setFile(null);
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
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={product.description}
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
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
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
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProductForm;
