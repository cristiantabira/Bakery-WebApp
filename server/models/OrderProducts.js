const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class OrderProducts extends Model {
        static associate(models) {
            OrderProducts.belongsTo(models.Order, {
                foreignKey: "orderId",
                as: "order",
            });
            OrderProducts.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "product",
            });
        }
    }

    OrderProducts.init(
        {
            // orderId: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     references: {
            //         model: "Order",
            //         key: "id",
            //     },
            // },
            // productId: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     references: {
            //         model: "Product",
            //         key: "id",
            //     },
            // },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: 0.0,
                },
            },
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
            indexes: [
                {
                    unique: true,
                    fields: ["orderId", "productId"],
                },
            ],
        }
    );

    return OrderProducts;
};
