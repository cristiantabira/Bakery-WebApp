const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = sign(
        { username: user.username, email: user.email, id: user.id || user._id },
        "parolaSecreta",
        {
            expiresIn: "30d",
        }
    );

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    try {
        const validToken = verify(accessToken, "parolaSecreta");
        if (validToken) {
            req.authenticated = true;
            req.user = validToken;
            return next();
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

const optionalValidateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        req.user = null;
        return next();
    }
    try {
        const validToken = verify(accessToken, "parolaSecreta");
        if (validToken) {
            req.authenticated = true;
            req.user = validToken;
        } else {
            req.user = null;
        }
    } catch (err) {
        req.user = null;
    }
    next();
};

module.exports = { createToken, validateToken, optionalValidateToken };
