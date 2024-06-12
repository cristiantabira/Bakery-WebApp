const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { validateToken } = require("../utils/JWT");

router.get("/", cartController.index);
router.post("/addProduct", validateToken, cartController.addToCart);

module.exports = router;
