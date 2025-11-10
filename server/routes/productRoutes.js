const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../config/uploadConfig");
const { validateToken } = require("../utils/JWT");
const { requireAdmin } = require("../utils/adminMiddleware");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Admin-only routes (require authentication + admin role)
router.post("/add", validateToken, requireAdmin, upload.single("image"), productController.createProduct);
router.put("/:id", validateToken, requireAdmin, upload.single("image"), productController.updateProduct);
router.delete("/:id", validateToken, requireAdmin, productController.deleteProduct);

module.exports = router;
