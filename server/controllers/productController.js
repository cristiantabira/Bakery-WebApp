// Example in server/controllers/productController.js
// const { Product } = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.addProduct = async (req, res) => {
    // Implementation for adding a new product
};

exports.updateProduct = async (req, res) => {
    // Implementation for updating a product
};

exports.deleteProduct = async (req, res) => {
    // Implementation for deleting a product
};
