import express from 'express';
import { getAllRecipes, getRecipeById, createRecipe } from '../controllers/recipesController';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

// get all recipes or by ingredients - GET /api/recipes?ingredients=alho,tomate
// Basically, in this endpoint you can pass the ingredients you want as arguments, and the endpoint will give back all the recipes that match the given ingredients, and if no ingredients are passed in the parameter, you'll get back all recipes
router.get('/', getAllRecipes);

// Get recipe by its ID - GET /api/recipes/:id
router.get('/:id', getRecipeById);

// Create a recipe (with image or not) - POST /api/recipes
router.post('/', upload.single('image'), createRecipe);

export default router;
