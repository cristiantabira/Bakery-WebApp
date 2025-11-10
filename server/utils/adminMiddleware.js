const { User } = require("../models");

const requireAdmin = async (req, res, next) => {
    try {
        // req.user is set by validateToken middleware
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Fetch user from database to get role
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Check if user is admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }

        // User is admin, proceed
        next();
    } catch (error) {
        console.error("Admin middleware error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { requireAdmin };

