const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./dev.sqlite",
    logging: false,
});

const User = require("./user")(sequelize, Sequelize.DataTypes);
const Cart = require("./cart")(sequelize, Sequelize.DataTypes);
const Product = require("./product")(sequelize, Sequelize.DataTypes);
const Order = require("./order")(sequelize, Sequelize.DataTypes);
const CartProducts = require("./cartProducts")(sequelize, Sequelize.DataTypes);
const OrderProducts = require("./orderProducts")(
    sequelize,
    Sequelize.DataTypes
);
const Recipe = require("./Recipe")(sequelize, Sequelize.DataTypes);

const models = {
    User,
    Cart,
    Product,
    Order,
    CartProducts,
    OrderProducts,
    Recipe,
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

require("../utils/associations")(models);

module.exports = {
    ...models,
    sequelize,
};
