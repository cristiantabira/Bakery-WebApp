const { DataTypes } = require("sequelize");

const OrderProducts = (sequelize) => {
    return sequelize.define(
        "OrderProducts",
        {
            orderId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "order",
                    key: "id",
                },
            },
            productId: {
                type: DataTypes.INTEGER,
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
            timestamps: false,
        }
    );
};

module.exports = OrderProducts;
