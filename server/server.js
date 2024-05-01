const express = require("express");
const multer = require("multer");
const path = require("path");
const { synchronizeDatabase } = require("./models/databaseConfig");
const cors = require("cors");
const app = express();
app.use(cors()); // Use more specific settings in a production environment

// Middleware to parse JSON bodies must be placed before route handlers
app.use(express.json());

const homeRoutes = require("./routes/homeRoutes");
const shopRoutes = require("./routes/shopRoutes");
const cartRoutes = require("./routes/cartRoutes");
const accountRoutes = require("./routes/accountRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/", homeRoutes);
app.use("/shop", shopRoutes);
app.use("/cart", cartRoutes);
app.use("/account", accountRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await synchronizeDatabase();
        console.log("Database is synchronized and ready.");
    } catch (error) {
        console.error("Failed to synchronize the database:", error);
    }
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(500).send({ message: err.message });
    } else if (err) {
        res.status(500).send({ message: "An unknown error occurred!" });
    } else {
        next();
    }
});
const { Product } = require("./models/Product"); // Assuming your Product model is exported from "./models"

const addTestProducts = async () => {
    try {
        // Add first product
        await Product.create({
            name: "Test Product 1",
            price: 19.99,
        });

        // Add second product
        await Product.create({
            name: "Test Product 2",
            price: 29.99,
        });

        console.log("Test products added successfully.");
    } catch (error) {
        console.error("Error adding test products:", error);
    }
};

// Call the function to add test products
addTestProducts();
