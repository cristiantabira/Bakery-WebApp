const { Product } = require("../models");

exports.getAllProducts = async (req, res) => {
    try {
        const productList = await Product.findAll();
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const imageUrl = req.file ? req.file.path : null; // Handle no file case
        const product = await Product.create({
            name,
            description,
            price,
            category,
            imageUrl,
        });
        res.status(201).send(product);
    } catch (error) {
        console.error("here was an error creating the product:", error);
        res.status(500).send(error);
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send("Product deleted");
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
