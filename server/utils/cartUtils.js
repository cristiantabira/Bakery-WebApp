const { Cart, CartProducts } = require("../models");

const mergeCarts = async (sessionId, userId) => {
    try {
        const sessionCart = await Cart.findOne({ where: { sessionId } });
        if (!sessionCart) return;

        const userCart = await Cart.findOne({ where: { userId } });
        if (!userCart) {
            sessionCart.userId = userId;
            sessionCart.sessionId = null;
            await sessionCart.save();
            return;
        }

        const sessionCartProducts = await CartProducts.findAll({
            where: { cartId: sessionCart.id },
        });
        for (const sessionProduct of sessionCartProducts) {
            const [userProduct, created] = await CartProducts.findOrCreate({
                where: {
                    cartId: userCart.id,
                    productId: sessionProduct.productId,
                },
                defaults: {
                    cartId: userCart.id,
                    productId: sessionProduct.productId,
                    quantity: sessionProduct.quantity,
                    price: sessionProduct.price,
                },
            });

            if (!created) {
                userProduct.quantity += sessionProduct.quantity;
                userProduct.subtotal = userProduct.quantity * userProduct.price;
                await userProduct.save();
            }

            await sessionProduct.destroy();
        }

        await sessionCart.destroy();
    } catch (error) {
        console.error("Failed to merge carts:", error);
    }
};

module.exports = { mergeCarts };
