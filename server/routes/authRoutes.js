const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { createToken, validateToken } = require("../utils/JWT");
const { User } = require("../models");

router.post("/login", authController.login);

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        req.body.hash = hash; // hashed password to req.body
        authController.signUpUser(req, res);
    });
});

router.get("/me", validateToken, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    res.json({ user });
});
router.get("/validateToken", validateToken, async (req, res) => {
    if (req.authenticated) {
        const user = await User.findById(req.user.id);
        res.json({ valid: true, user });
    } else {
        res.json({ valid: false });
    }
});
router.post("/logout", authController.logout); // Added logout route

module.exports = router;
