const express = require("express");
const multer = require("multer");
const path = require("path");
const { synchronizeDatabase } = require("./models/databaseConfig");

const app = express();

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
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
