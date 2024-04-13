const express = require("express");
const { synchronizeDatabase } = require("./models/databaseConfig"); // Import the synchronization function

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

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await synchronizeDatabase();
        console.log("Database is synchronized and ready.");
    } catch (error) {
        console.error("Failed to synchronize the database:", error);
    }
});
