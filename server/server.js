const express = require("express");
const { sequelize } = require("./models");

const app = express();
const port = 5000;
const cors = require("cors");

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000", // Adresa de bază a aplicației React
    })
);
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        return sequelize.sync({ force: true }); // Set force to true to drop tables
    })
    .then(() => {
        app.listen(port, () =>
            console.log(`Server running on http://localhost:${port}`)
        );
    })
    .catch((err) => console.error("Unable to connect to the database:", err));
