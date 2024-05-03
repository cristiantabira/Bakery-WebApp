const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Order extends Model {}
    Order.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users", // asigură-te că numele tabelului este corect
                    key: "id",
                },
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
