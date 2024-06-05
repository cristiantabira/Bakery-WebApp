const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class CartProducts extends Model {}

    CartProducts.init(
        {
            cartId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "carts",
                    key: "cart_id",
                },
            },
            productIdCart: {
                type: DataTypes.INTEGER,
                references: {
                    model: "products",
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
            sequelize,
            modelName: "CartProducts",
            tableName: "cart_products",
            timestamps: false,
        }
    );

    return CartProducts;
};
