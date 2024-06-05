const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
    const accesToken = sign(
        { username: user.username, email: user.email, id: user._id },
        "parolaSecreta"
    );

    return accesToken;
};

const validateToken = (req, res, next) => {
    console.log(req.cookies);
    const accessToken = req.cookies["access-token"];
    if (!accessToken) return res.status(400).json("User not authenticated");
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
    return next();
};

module.exports = { createToken, validateToken };
