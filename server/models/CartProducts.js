// models/cartProduct.js
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const CartProduct = sequelize.define(
        "CartProduct",
        {
            cartId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Cart",
                    key: "id",
                },
            },
            productIdCart: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Product",
                    key: "id",
                },
            },

            quantity: DataTypes.INTEGER,
            price: DataTypes.FLOAT,
            subtotal: {
                type: DataTypes.FLOAT,
                allowNull: false,
                get() {
                    return (
                        this.getDataValue("quantity") *
                        this.getDataValue("price")
                    );
                },
            },
        },
        {
            timestamps: false, // Assume no need for timestamps
        }
    );

    return CartProduct;
};
