const express = require("express");
const app = express();

// Import routes
const homeRoutes = require("./routes/homeRoutes");
const shopRoutes = require("./routes/shopRoutes");
const cartRoutes = require("./routes/cartRoutes");
const accountRoutes = require("./routes/accountRoutes");
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use("/", homeRoutes);
app.use("/shop", shopRoutes);
app.use("/cart", cartRoutes);
app.use("/account", accountRoutes);
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
