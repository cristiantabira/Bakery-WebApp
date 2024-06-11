const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
    const accesToken = sign(
        { username: user.username, email: user.email, id: user._id },
        "parolaSecreta"
    );

    return accesToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        req.user = null; // Permite utilizatorilor neautentificați
        return next();
    }
    try {
        const validToken = verify(accessToken, "parolaSecreta");
        console.log("Decoded JWT:", validToken); // Afișează conținutul decodat al token-ului în consolă
        if (validToken) {
            req.authenticated = true;
            req.user = validToken;
            return next();
        }
    } catch (err) {
        return res.status(400).json(err);
    }
    req.user = null; // Permite utilizatorilor neautentificați
    next();
};

module.exports = { validateToken };
module.exports = { createToken, validateToken };
