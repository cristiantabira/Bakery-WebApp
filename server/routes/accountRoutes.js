const express = require("express");
const accountController = require("./controllers/accountController");
const router = express.Router();

// Assuming the user is authenticated and their ID is available via session or token
router.get("/profile/:userId", accountController.getUserProfile);
router.get("/orders/:userId", accountController.getUserOrders);
router.get("/cart/:userId", accountController.getUserCart);
router.put("/profile/:userId", accountController.updateUserProfile);
router.delete(
    "/order/:orderId/product/:productId",
    accountController.removeProductFromOrder
);

module.exports = router;
