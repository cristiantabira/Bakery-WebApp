import { DataTypes, Sequelize } from "sequelize";
import { UserTemplate } from "./User.js";
import { CartTemplate } from "./Cart.js";
import { ProductTemplate } from "./Product.js";
import { OrderTemplate } from "./Order.js";

export const db = new Sequelize({
    dialect: "sqlite",
    storage: "./path_to_your_database/system.db"  // Actualizează cu calea către baza de date
});

// Inițializează modelele
export const User = UserTemplate(db, DataTypes);
export const Cart = CartTemplate(db, DataTypes);
export const Product = ProductTemplate(db, DataTypes);
export const Order = OrderTemplate(db, DataTypes);


// User -> Cart (One to One)
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Cart -> Product (Many to Many)
Cart.belongsToMany(Product, { through: 'CartProduct', foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: 'CartProduct', foreignKey: 'productId' });

// Order -> User (Many to One)
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order -> Product (Many to Many)
// Presupunem că ai o tabelă de asociere `OrderProduct` pentru a gestiona relația many-to-many
Order.belongsToMany(Product, { through: 'OrderProduct', foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: 'OrderProduct', foreignKey: 'productId' });

export const synchronizeDatabase = async () => {
    await db.authenticate();
    await db.sync({ force: false }); // Setează `force: true` doar dacă vrei să reinițializezi schema bazei de date
};
