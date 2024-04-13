const { DataTypes } = require("sequelize");

const Order = (db, DataTypes) => {
    return db.define("order", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue("details");
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value) {
                this.setDataValue("details", JSON.stringify(value));
            },
        },
        total: DataTypes.FLOAT,
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending",
        },
    });
};

module.exports = Order;
