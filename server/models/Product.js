const { DataTypes } = require("sequelize");

const Product = (db, DataTypes) => {
    return db.define("product", {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        category: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
    });
};

module.exports = Product;
