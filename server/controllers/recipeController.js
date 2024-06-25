const { Recipe } = require("../models");

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipesByRegion = async (req, res) => {
    try {
        const { region } = req.params;
        const recipes = await Recipe.findAll({ where: { region } });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const { name, ingredients, region, preparation } = req.body;
        const recipe = await Recipe.create({
            name,
            ingredients,
            region,
            preparation,
        });
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Recipe.update(req.body, { where: { id } });
        if (updated) {
            const updatedRecipe = await Recipe.findByPk(id);
            res.status(200).json(updatedRecipe);
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Recipe.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: "Recipe deleted" });
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
