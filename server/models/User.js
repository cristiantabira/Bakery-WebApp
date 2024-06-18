const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class User extends Model {}
    User.init(
        {
            name: { type: DataTypes.STRING, allowNull: true },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "user",
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
