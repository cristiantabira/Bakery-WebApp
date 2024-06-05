module.exports = (models) => {
    models.User.hasOne(models.Cart, { foreignKey: "userId" });
    models.Cart.belongsTo(models.User, { foreignKey: "userId" });

    models.Cart.belongsToMany(models.Product, { through: models.CartProduct });
    models.Product.belongsToMany(models.Cart, { through: models.CartProduct });

    models.User.hasMany(models.Order, { foreignKey: "userId" });
    models.Order.belongsTo(models.User, { foreignKey: "userId" });

    models.Order.belongsToMany(models.Product, {
        through: models.OrderProducts,
    });
    models.Product.belongsToMany(models.Order, {
        through: models.OrderProducts,
    });
};
