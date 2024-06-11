const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Cart extends Model {}

    Cart.init(
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
        },
        {
            sequelize,
            modelName: "Cart",
            tableName: "carts",
            timestamps: true,
        }
    );

    return Cart;
};
