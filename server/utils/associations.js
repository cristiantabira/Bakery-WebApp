module.exports = (models) => {
    models.User.hasOne(models.Cart, { foreignKey: "userId" });
    models.Cart.belongsTo(models.User, { foreignKey: "userId" });

    models.Cart.belongsToMany(models.Product, {
        through: models.CartProducts,
        foreignKey: "cartId",
    });
    models.Product.belongsToMany(models.Cart, {
        through: models.CartProducts,
        foreignKey: "productId",
    });

    models.User.hasMany(models.Order, { foreignKey: "userId" });
    models.Order.belongsTo(models.User, { foreignKey: "userId" });

    models.Order.belongsToMany(models.Product, {
        through: models.OrderProducts,
        foreignKey: "orderId",
    });
    models.Product.belongsToMany(models.Order, {
        through: models.OrderProducts,
        foreignKey: "productId",
    });
};
