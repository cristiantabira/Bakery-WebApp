const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
    const accesToken = sign(
        { username: user.username, email: user.email, id: user._id },
        "parolaSecreta",
        {
            expiresIn: "30d",
        }
    );

    return accesToken;
};

//De adaugat o noua functie
const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        req.user = null;
        return next();
    }
    try {
        const validToken = verify(accessToken, "parolaSecreta");
        console.log("Decoded JWT:", validToken);
        if (validToken) {
            req.authenticated = true;
            req.user = validToken;
            return next();
        }
    } catch (err) {
        return res.status(400).json(err);
    }
    //req.user = null; // pt utilizatori neautentificați !!!
    next();
};

// module.exports = { validateToken };
module.exports = { createToken, validateToken };
