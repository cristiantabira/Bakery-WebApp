const { DataTypes } = require("sequelize");

const User = (db, DataTypes) => {
    return db.define("user", {
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
    });
};

module.exports = User;
