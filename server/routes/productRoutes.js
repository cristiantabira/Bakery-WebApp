const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../config/uploadConfig");

router.get("/", productController.getAllProducts);
router.post("/add", upload.single("image"), productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
