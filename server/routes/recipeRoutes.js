const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);
router.get("/region/:region", recipeController.getRecipesByRegion);
router.post("/", recipeController.createRecipe);
router.put("/:id", recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
