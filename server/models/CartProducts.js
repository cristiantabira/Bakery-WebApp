const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class CartProducts extends Model {}

    CartProducts.init(
        {
            cartId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "cart",
                    key: "id",
                },
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "product",
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
            indexes: [
                {
                    unique: true,
                    fields: ["cartId", "productId"],
                },
            ],
        }
    );

    return CartProducts;
};
