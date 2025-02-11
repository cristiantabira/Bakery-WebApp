const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class CartProducts extends Model {
        static associate(models) {
            CartProducts.belongsTo(models.Cart, {
                foreignKey: "cartId",
                as: "cart",
            });
            CartProducts.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "product",
            });
        }
    }

    CartProducts.init(
        {
            cartId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Cart",
                    key: "id",
                },
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Product",
                    key: "id",
                },
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: 0.0,
                },
            },
            subtotal: {
                type: DataTypes.FLOAT,
                allowNull: false,
                get() {
                    return (
                        this.getDataValue("quantity") *
                        this.getDataValue("price")
                    );
                },
            },
        },
        {
            sequelize,
            modelName: "CartProducts",
            tableName: "cart_products",
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ["cartId", "productId"],
                },
            ],
        }
    );

    return CartProducts;
};
