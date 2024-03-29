const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login route
router.get("/login", authController.login);

// Sign-up route
router.get("/signup", authController.signup);

module.exports = router;
