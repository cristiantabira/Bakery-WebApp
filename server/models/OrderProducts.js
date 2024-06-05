const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class OrderProducts extends Model {}

    OrderProducts.init(
        {
            orderIdOrder: {
                type: DataTypes.INTEGER,
                references: {
                    model: "order",
                    key: "id",
                },
            },
            productIdOrder: {
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
            sequelize,
            modelName: "OrderProducts",
            tableName: "order_products",
            timestamps: false,
        }
    );

    return OrderProducts;
};
