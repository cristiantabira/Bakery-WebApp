const { Cart, CartProduct, Product } = require("../models");
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
        let userId = req.user ? req.user.id : null;
        let sessionId = req.cookies.sessionId ? req.cookies.sessionId : null;

        if (!userId && !sessionId) {
            sessionId = uuidv4();
            res.cookie("sessionId", sessionId, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
        }

        const [cart, created] = await Cart.findOrCreate({
            where: userId ? { userId } : { sessionId },
            defaults: userId ? { userId } : { sessionId },
        });

        const { productId, quantity, price } = req.body;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        try {
            const [cartProduct, productCreated] =
                await CartProduct.findOrCreate({
                    where: { cartId: cart.id, productId: product.id },
                    defaults: {
                        cartId: cart.id,
                        productId: product.id,
                        quantity,
                        price: product.price,
                        subtotal: product.price * quantity,
                    },
                });

            console.log("ProductCreated:", productCreated);
            console.log("CartProduct:", cartProduct);

            if (!productCreated) {
                cartProduct.quantity += quantity;
                cartProduct.price = product.price;
                cartProduct.subtotal = cartProduct.quantity * cartProduct.price;
                await cartProduct.save();
            }

            res.status(200).json({
                message: "Product added to cart",
                cartProduct,
            });
        } catch (error) {
            console.error("Failed to add product to cart:", error);

            if (error.name === "SequelizeUniqueConstraintError") {
                try {
                    const cartProduct = await CartProduct.findOne({
                        where: { cartId: cart.id, productId: product.id },
                    });

                    cartProduct.quantity += quantity;
                    cartProduct.subtotal =
                        cartProduct.quantity * cartProduct.price;
                    await cartProduct.save();

                    return res.status(200).json({
                        message: "Product added to cart",
                        cartProduct,
                    });
                } catch (findError) {
                    console.error(
                        "Failed to find product after unique constraint error:",
                        findError
                    );
                    return res.status(500).json({
                        error: "An error occurred while adding the product to the cart after unique constraint error",
                        details: findError.message,
                    });
                }
            } else {
                return res.status(500).json({
                    error: "An error occurred while adding the product to the cart",
                    details: error.message,
                });
            }
        }
    } catch (error) {
        console.error("Failed to add product to cart:", error);
        res.status(500).json({
            error: "An error occurred while adding the product to the cart",
            details: error.message,
        });
    }
};
