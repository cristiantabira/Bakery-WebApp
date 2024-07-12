const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.CartProducts, {
                foreignKey: "productId",
                as: "cartProducts",
            });
        }
    }

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
                    isFloat: true,
                },
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Product;
};
