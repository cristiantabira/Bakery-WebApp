const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login route
router.get("/login", authController.login);

// Sign-up route
router.get("/signup", authController.signup);

router.post("/login", (req, res) => {
    res.json("login");
});
module.exports = router;
