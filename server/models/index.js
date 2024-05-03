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

// Aici importăm și inițializăm modelul
db.User = require("./User.js")(sequelize, DataTypes);
db.Order = require("./Order.js")(sequelize, DataTypes);
db.Product = require("./Product.js")(sequelize, DataTypes);
db.Cart = require("./Cart.js")(sequelize, DataTypes);
db.CartProduct = require("./CartProducts.js")(sequelize, DataTypes);
db.OrderProducts = require("./OrderProducts.js")(sequelize, DataTypes);

require("../utils/associations.js")(db);
module.exports = db;
