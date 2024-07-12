const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { validateToken, optionalValidateToken } = require("../utils/JWT");

router.get("/", cartController.index);
router.post("/addProduct", optionalValidateToken, cartController.addToCart);
router.get(
    "/:cartId/products",
    optionalValidateToken,
    cartController.getCartProductsByCartId
);
router.get("/getCart", optionalValidateToken, cartController.getUserCart);
router.delete(
    "/removeProduct/:cartId/:productId",
    optionalValidateToken,
    cartController.removeFromCart
);
router.put(
    "/updateProduct/:cartId/:productId",
    optionalValidateToken,
    cartController.updateCartProductQuantity
);

module.exports = router;
