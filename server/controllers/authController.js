const e = require("express");
const { User } = require("../models");

exports.login = (req, res) => {
    res.send("Login Page");
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
