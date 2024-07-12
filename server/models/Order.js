const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
            Order.hasMany(models.OrderProducts, {
                foreignKey: "orderId",
                as: "orderProducts",
            });
            Order.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });
        }
    }

    Order.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            sessionId: {
                type: DataTypes.UUID,
                allowNull: true,
                unique: true,
            },
            details: {
                type: DataTypes.TEXT,
                allowNull: false,
                get() {
                    const rawValue = this.getDataValue("details");
                    return rawValue ? JSON.parse(rawValue) : null;
                },
                set(value) {
                    this.setDataValue("details", JSON.stringify(value));
                },
            },
            total: DataTypes.FLOAT,
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
            },
        },
        {
            sequelize,
            modelName: "Order",
            tableName: "orders",
            timestamps: true,
        }
    );

    return Order;
};
