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
            password: DataTypes.STRING,
            role: {
                type: DataTypes.ENUM("user", "baker"),
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
