const { Sequelize, DataTypes } = require("sequelize");
const UserTemplate = require("./User");
const CartTemplate = require("./Cart");
const ProductTemplate = require("./Product");
const OrderTemplate = require("./Order");
const OrderProductsTemplate = require("./OrderProducts");
// Define the database connection
const db = new Sequelize({
    dialect: "sqlite",
    storage:
        "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\server\\models\\system.db", // Ensure this path is correctly set up
});

// Initialize models
const User = UserTemplate(db, DataTypes);
const Cart = CartTemplate(db, DataTypes);
const Product = ProductTemplate(db, DataTypes);
const Order = OrderTemplate(db, DataTypes);
const OrderProducts = OrderProductsTemplate(db, DataTypes);

// Define model relationships
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, { through: "CartProduct", foreignKey: "cartId" });
Product.belongsToMany(Cart, {
    through: "CartProduct",
    foreignKey: "productId",
});

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.belongsToMany(Product, { through: OrderProducts });
Product.belongsToMany(Order, { through: OrderProducts });

// Export models and db for use elsewhere in the project
module.exports = {
    db,
    User,
    Cart,
    Product,
    Order,
    OrderProducts,
};

// Synchronize the database
const synchronizeDatabase = async () => {
    try {
        await db.authenticate();
        await db.sync({ force: false }); // Set `force: true` during development if needed to recreate tables
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Failed to sync database:", error);
    }
};

module.exports.synchronizeDatabase = synchronizeDatabase;
