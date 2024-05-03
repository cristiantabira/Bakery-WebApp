const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class User extends Model {}
    User.init(
        {
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true,
        }
    );

    return User;
};
