import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ id, name, price, imageUrl, productPage }) => {
    const navigate = useNavigate();

    return (
        <div className="product" onClick={() => navigate(productPage)}>
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            <p>{price}</p>
        </div>
    );
};

export default Product;
