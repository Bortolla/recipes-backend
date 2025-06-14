import { Request, Response } from 'express';
import { ResponseDTO } from '../dtos/responseDto';
import * as recipesService from '../services/recipesService';

export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
    // If  the endpoint receives ingredients or favorites in the query then we type assing it as a string, otherwise it remains as undefined
    const ingredientsParam = req.query.ingredients as string | undefined;
    const favoriteParam = req.query.favorite as string | undefined;

    // If we got ingredients, then we split them (based on comma) into an array, and trim possible whitespace
    const ingredients = ingredientsParam
        ? ingredientsParam.split(',').map(i => i.trim().toLowerCase())
        : [];

    // checking if we actually got the 'favorites' parameter and if it was set as 'true'
    const onlyFavorites = favoriteParam === 'true';

    try {
        const response = await recipesService.getAllRecipes(ingredients, onlyFavorites);
        response.sendResponse(res);
    } catch (error) {
        const response = new ResponseDTO("Error", 500, 'Error retrieving recipes', error);
        response.sendResponse(res);
    }
};


export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const response = await recipesService.getRecipeById(id);
        response.sendResponse(res);
    } catch (error) {
        const response = new ResponseDTO("Error", 404, `Recipe with ID ${id} not found`, error);
        response.sendResponse(res);
    }
};

export const createRecipe = async (req: Request, res: Response): Promise<void> => {
    const { name, ingredients, instructions } = req.body;
    const isFavorite = req.body.isFavorite === 'true';
    const image = req.file ? `/uploads/${req.file.filename}` : undefined; // if we got an image, set its path

    try {
        const response = await recipesService.createRecipe(name, ingredients, instructions, image, isFavorite);
        response.sendResponse(res);
    } catch (error) {
        const response = new ResponseDTO("Error", 500, 'Error creating recipe', error);
        response.sendResponse(res);
    }
};
