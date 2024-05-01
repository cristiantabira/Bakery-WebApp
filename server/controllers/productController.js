const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            res.send("Product updated successfully");
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const result = await Product.destroy({
            where: { id: req.params.id },
        });
        if (result) {
            res.send("Product deleted successfully");
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                name: { [Op.like]: `%${req.query.q}%` },
            },
        });
        res.json(products);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};
