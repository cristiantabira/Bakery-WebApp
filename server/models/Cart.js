const { DataTypes } = require("sequelize");

const Cart = (db, DataTypes) => {
    return db.define("cart", {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
        },
    });
};

module.exports = Cart;
