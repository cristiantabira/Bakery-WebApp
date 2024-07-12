const {
    User,
    Order,
    Cart,
    OrderProducts,
    CartProducts,
    Product,
} = require("../models");

exports.getUserProfile = async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const sessionId = req.cookies.sessionId ? req.cookies.sessionId : null;

        const orders = await Order.findAll({
            where: userId ? { userId } : { sessionId },
            include: {
                model: OrderProducts,
                as: "orderProducts",
                include: ["product"],
            },
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const sessionId = req.cookies.sessionId ? req.cookies.sessionId : null;

        const cart = await Cart.findOne({
            where: userId ? { userId } : { sessionId },
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
                    model: OrderProducts,
                    as: "orderProducts",
                },
            ],
        });

        if (order) {
            const productToRemove = order.orderProducts.find(
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

exports.createOrder = async (req, res) => {
    try {
        const { userId, sessionId, details, total, status } = req.body;

        const order = await Order.create({
            userId: userId || null,
            sessionId: userId ? null : sessionId,
            details,
            total,
            status,
        });

        const cartProducts = await CartProducts.findAll({
            where: userId ? { userId } : { sessionId },
        });

        const orderProducts = cartProducts.map((cartProduct) => ({
            orderId: order.id,
            productId: cartProduct.productId,
            quantity: cartProduct.quantity,
            price: cartProduct.price,
        }));

        await OrderProducts.bulkCreate(orderProducts);

        // Clear the cart after order creation
        await CartProducts.destroy({
            where: userId ? { userId } : { sessionId },
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
};
