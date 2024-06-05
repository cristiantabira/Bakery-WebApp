const { Cart, CartProduct, Product } = require("../models"); // Adjust import as necessary
const { v4: uuidv4 } = require("uuid"); // Import UUID for session ID generation

exports.addToCart = async (req, res) => {
    try {
        let userId = req.user ? req.user.id : null;
        let sessionId = req.cookies.sessionId;

        // If the user is not logged in and there's no session ID, create a new session ID
        if (!userId && !sessionId) {
            sessionId = uuidv4();
            res.cookie("sessionId", sessionId, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }); // 30 days
        }

        // Find or create the cart
        const [cart, created] = await Cart.findOrCreate({
            where: userId ? { userId } : { sessionId },
            defaults: userId ? { userId } : { sessionId },
        });

        // Find or create the cart product
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const [cartProduct, productCreated] = await CartProduct.findOrCreate({
            where: { cartId: cart.id, productIdCart: product.id },
            defaults: {
                cartId: cart.id,
                productIdCart: product.id,
                quantity,
                price: product.price,
                subtotal: product.price * quantity,
            },
        });

        if (!productCreated) {
            // If the product already exists in the cart, update the quantity and subtotal
            cartProduct.quantity += quantity;
            cartProduct.subtotal = cartProduct.quantity * cartProduct.price;
            await cartProduct.save();
        }

        res.status(200).json({ message: "Product added to cart", cartProduct });
    } catch (error) {
        console.error("Failed to add product to cart:", error);
        res.status(500).json({
            error: "An error occurred while adding the product to the cart",
        });
    }
};
