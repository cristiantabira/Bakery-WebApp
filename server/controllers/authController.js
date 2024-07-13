const e = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/JWT");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    bcrypt.compare(password, user.password).then((match) => {
        if (match) {
            const accessToken = createToken(user);
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
                httpOnly: true,
                secure: false,
            });
            res.status(202).json("User logged in");
        } else {
            res.status(401).json("Wrong username or password");
        }
    });
};

exports.signUpUser = async (req, res) => {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.hash,
    })
        .then(() => {
            res.json("User created successfully");
        })
        .catch((err) => {
            if (err) {
                res.status(500).send(err.message);
            }
        });
};
exports.getUserByEmail = async (email) => {
    return await User.findOne({
        where: { email: email },
    });
};
exports.logout = (req, res) => {
    res.clearCookie("access-token");
    res.status(200).json({ message: "User logged out" });
};
