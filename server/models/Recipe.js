const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Recipe extends Model {}

    Recipe.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            region: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            preparation: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Recipe",
            tableName: "recipes",
            timestamps: true,
        }
    );

    return Recipe;
};
