const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js").development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        storage: config.storage,
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize);
db.Order = require("./Order.js")(sequelize);
db.Product = require("./Product.js")(sequelize);
db.Cart = require("./Cart.js")(sequelize);
db.CartProduct = require("./CartProducts.js")(sequelize);
db.OrderProducts = require("./OrderProducts.js")(sequelize);

require("../utils/associations.js")(db);
module.exports = db;
