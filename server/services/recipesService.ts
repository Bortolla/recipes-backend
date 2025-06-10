import { ResponseDTO } from '../dtos/responseDto';
import * as recipesData from '../data/recipesData';
import { on } from 'events';

export const getAllRecipes = async (ingredients: string[], onlyFavorites: boolean): Promise<ResponseDTO> => {
    // If no ingredients, just get all of the recipes
    // if there are ingredients, then get the recipes with said ingredients
    const recipes = ingredients.length === 0
        ? await recipesData.getAllRecipes(onlyFavorites)
        : await recipesData.getRecipesByIngredients(ingredients, onlyFavorites);

    return new ResponseDTO("Success", 200, 'Recipes retrieved successfully', recipes);
};

export const getRecipeById = async (id: string): Promise<ResponseDTO> => {
    if (!id) {
        return new ResponseDTO("Error", 400, 'Recipe ID is required');
    }

    try {
        const recipe = await recipesData.getRecipeById(id);
        return new ResponseDTO("Success", 200, 'Recipe retrieved successfully', recipe);
    } catch {
        return new ResponseDTO("Error", 404, 'Recipe not found');
    }
};

export const createRecipe = async (
    name: string,
    ingredientsRaw: string[] | string,
    instructions: string,
    image?: string,
    isFavorite: boolean = false
): Promise<ResponseDTO> => {
    if (!name || name.trim().length < 1) {
        return new ResponseDTO("Error", 400, 'Name is required');
    }

    const ingredients =
        typeof ingredientsRaw === 'string'
            ? ingredientsRaw.split(',').map(i => i.trim().toLowerCase())
            : ingredientsRaw.map(i => i.trim().toLowerCase());

    if (ingredients.length === 0) {
        return new ResponseDTO("Error", 400, 'At least one ingredient is required');
    }

    if (!instructions || instructions.trim().length < 10) {
        return new ResponseDTO("Error", 400, 'Instructions must be at least 10 characters long');
    }

    const recipe = await recipesData.createRecipe(name, ingredients, instructions, image, isFavorite);
    return new ResponseDTO("Success", 201, 'Recipe created successfully', recipe);
};
