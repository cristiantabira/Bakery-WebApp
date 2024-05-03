const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {}

    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: true, // Ensures the price is a floating number
                },
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true, // Set to true as not all products may have an image initially
            },
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
            timestamps: false,
        }
    );

    return Product;
};
