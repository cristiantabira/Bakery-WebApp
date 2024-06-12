const { Cart, CartProduct } = require("../models");

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

        const sessionCartProducts = await CartProduct.findAll({
            where: { cartId: sessionCart.id },
        });
        for (const sessionProduct of sessionCartProducts) {
            const [userProduct, created] = await CartProduct.findOrCreate({
                where: {
                    cartId: userCart.id,
                    productIdCart: sessionProduct.productIdCart,
                },
                defaults: {
                    cartId: userCart.id,
                    productIdCart: sessionProduct.productIdCart,
                    quantity: sessionProduct.quantity,
                    price: sessionProduct.price,
                    subtotal: sessionProduct.subtotal,
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
