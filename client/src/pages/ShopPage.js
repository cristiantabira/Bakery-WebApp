import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\ShopPage.css";
import { CONSTANTS } from "../components/Constants";

const ShopPage = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Croissant",
            price: 4,
            imageUrl: CONSTANTS.IMAGES.croissant,
        },
        {
            id: 2,
            name: "Briosa",
            price: 5.5,
            imageUrl: CONSTANTS.IMAGES.briosa,
        },
        {
            id: 3,
            name: "Cinnamon Rolls",
            price: 5.8,
            imageUrl: CONSTANTS.IMAGES.cinnamonRolls,
        },
        {
            id: 4,
            name: "Macarons",
            price: 9,
            imageUrl: CONSTANTS.IMAGES.macarons,
        },
        {
            id: 5,
            name: "Pain Au Chocolat",
            price: 8,
            imageUrl: CONSTANTS.IMAGES.painAuChocolat,
        },
        {
            id: 7,
            name: "Tarta Fructe",
            price: 10,
            imageUrl: CONSTANTS.IMAGES.tartaFructe,
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                {filteredProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    >
                        <div className="card">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">
                                    {product.price.toFixed(2)} RON
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
