const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Cart extends Model {}

    Cart.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
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
