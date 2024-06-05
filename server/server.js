const express = require("express");
const { sequelize } = require("./models");

const app = express();
const port = 5000;
const cors = require("cors");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully.");
//         return sequelize.sync({ force: false }); // Set force to true to drop tables
//     })
//     .then(() => {
//         app.listen(port, () =>
//             console.log(`Server running on http://localhost:${port}`)
//         );
//     })
//     .catch((err) => console.error("Unable to connect to the database:", err));
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        return sequelize.sync({ force: false });
    })
    .then(async () => {
        const tableExists = await sequelize
            .getQueryInterface()
            .showAllSchemas();
        if (!tableExists.some((schema) => schema.name === "products")) {
            throw new Error("Tabela 'products' nu există");
        }
        app.listen(port, () =>
            console.log(`Server running on http://localhost:${port}`)
        );
    })
    .catch((err) => console.error("Unable to connect to the database:", err));
// sequelize.sync({ force: false }).then(async () => {
//     const tables = await sequelize.getQueryInterface().showAllSchemas();
//     console.log("Tables in database:", tables);
// });
