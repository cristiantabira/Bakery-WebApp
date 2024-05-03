const { User, Order, Cart } = require("../models");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.userId },
            include: [
                {
                    model: Product,
                    through: { attributes: [] },
                },
            ],
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { userId: req.userId },
            include: [Product],
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await User.update(req.body, {
            where: { id: userId },
        });
        if (updatedUser) {
            res.status(200).json({
                message: "User profile updated successfully.",
            });
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.removeProductFromOrder = async (req, res) => {
    try {
        const { orderId, productId } = req.params;
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: OrderedProduct,
                    as: "orderedProducts",
                },
            ],
        });

        if (order) {
            const productToRemove = order.orderedProducts.find(
                (p) => p.productId === parseInt(productId)
            );
            if (productToRemove) {
                await productToRemove.destroy();
                res.status(200).send(
                    "Product removed from order successfully."
                );
            } else {
                res.status(404).send("Product not found in order.");
            }
        } else {
            res.status(404).send("Order not found.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
