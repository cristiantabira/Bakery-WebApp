// const express = require("express");
// const router = express.Router();
// // const productController = require("../controllers/productController");
// const {
//     getAllProducts,
//     getProductById,
//     addProduct,
//     updateProduct,
//     deleteProduct,
//     searchProducts,
// } = require("../controllers/productController");
// router.get("/", getAllProducts);

// router.get("/:id", getProductById);

// router.post("/add", addProduct);

// router.put("/:id", updateProduct);

// router.delete("/:id", deleteProduct);

// router.get("/search", searchProducts);

// module.exports = router;

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
