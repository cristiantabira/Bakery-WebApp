const { Cart, CartProducts, Product } = require("../models");
const { v4: uuidv4 } = require("uuid");
exports.index = async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.status(200).json(carts);
    } catch (error) {
        console.error("Failed to fetch carts:", error);
        res.status(500).json({
            error: "An error occurred while fetching carts",
        });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body;
        let userId = req.user ? req.user.id : null;
        let sessionId = req.cookies.sessionId ? req.cookies.sessionId : null;

        if (!userId && !sessionId) {
            // Create a new session ID if it doesn't exist
            sessionId = uuidv4();
            res.cookie("sessionId", sessionId, {
                httpOnly: true,
                secure: false,
            });
        }

        // Find or create the cart
        let cart = await Cart.findOne({
            where: userId ? { userId } : { sessionId },
        });
        if (!cart) {
            cart = await Cart.create({ userId, sessionId });
        }

        // Find or create the cart product
        let cartProduct = await CartProducts.findOne({
            where: { cartId: cart.id, productId },
        });
        if (cartProduct) {
            cartProduct.quantity += quantity;
            cartProduct.subtotal = cartProduct.quantity * price;
            await cartProduct.save();
        } else {
            cartProduct = await CartProducts.create({
                cartId: cart.id,
                productId,
                quantity,
                price,
                subtotal: quantity * price,
            });
        }

        res.status(200).json(cartProduct);
    } catch (error) {
        console.error("Failed to add product to cart:", error);
        res.status(500).json({
            error: "An error occurred while adding the product to the cart",
        });
    }
};

exports.getCartProductsByCartId = async (req, res) => {
    try {
        const { cartId } = req.params;

        const cartProducts = await CartProducts.findAll({
            where: { cartId },
            include: [
                {
                    model: Product,
                    as: "product",
                },
            ],
        });

        if (!cartProducts) {
            return res.status(404).json({ error: "Cart products not found" });
        }

        res.status(200).json(cartProducts);
    } catch (error) {
        console.error("Failed to fetch cart products:", error);
        res.status(500).json({
            error: "An error occurred while fetching cart products",
        });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const sessionId = req.cookies.sessionId;

        if (!userId && !sessionId) {
            return res.status(404).json({ error: "No cart found" });
        }

        const cart = await Cart.findOne({
            where: userId ? { userId } : { sessionId },
            include: {
                model: CartProducts,
                as: "cartProducts",
                include: [
                    {
                        model: Product,
                        as: "product",
                    },
                ],
            },
        });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Failed to fetch user cart:", error);
        res.status(500).json({
            error: "An error occurred while fetching the user cart",
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cartProduct = await CartProducts.findOne({
            where: {
                cartId,
                productId,
            },
        });

        if (!cartProduct) {
            return res.status(404).json({ error: "Cart product not found" });
        }

        await cartProduct.destroy();

        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.error("Failed to remove product from cart:", error);
        res.status(500).json({
            error: "An error occurred while removing the product from the cart",
        });
    }
};

exports.updateCartProductQuantity = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        const cartProduct = await CartProducts.findOne({
            where: { cartId, productId },
        });

        if (!cartProduct) {
            return res.status(404).json({ error: "Cart product not found" });
        }

        cartProduct.quantity = quantity;
        cartProduct.subtotal = quantity * cartProduct.price;
        await cartProduct.save();

        res.status(200).json(cartProduct);
    } catch (error) {
        console.error("Failed to update cart product quantity:", error);
        res.status(500).json({
            error: "An error occurred while updating the cart product quantity",
        });
    }
};
