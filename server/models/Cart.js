const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Cart extends Model {
        static associate(models) {
            Cart.hasMany(models.CartProducts, {
                foreignKey: "cartId",
                as: "cartProducts",
            });
            Cart.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });
        }
    }

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
