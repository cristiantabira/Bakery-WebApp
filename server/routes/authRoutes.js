const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { createToken, validateToken } = require("../utils/JWT");
const { User } = require("../models");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await authController.getUserByEmail(email);
    if (user) {
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                const accesToken = createToken(user);
                res.cookie("access-token", accesToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                });
                res.status(202);
                res.json("User logged in");
            } else {
                res.json("Wrong username or password");
            }
        });
    } else {
        res.status(400).json("User not found");
    }
});

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        req.body.hash = hash; // add hashed password to req.body
        authController.signUpUser(req, res);
    });
});

router.get("/me", validateToken, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    res.json({ user });
});

module.exports = router;
