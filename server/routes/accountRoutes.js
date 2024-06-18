const express = require("express");
const accountController = require("../controllers/accountController");
const { validateToken } = require("../utils/JWT");
const router = express.Router();

router.get("/profile", validateToken, accountController.getUserProfile);
router.get("/orders/:userId", accountController.getUserOrders);
router.get("/cart/:userId", accountController.getUserCart);
router.put("/:userId", accountController.updateUserProfile);
router.delete(
    "/order/:orderId/product/:productId",
    accountController.removeProductFromOrder
);

module.exports = router;
