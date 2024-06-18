const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { validateToken, optionalValidateToken } = require("../utils/JWT");

router.get("/", cartController.index);
router.post("/addProduct", optionalValidateToken, cartController.addToCart);

module.exports = router;
