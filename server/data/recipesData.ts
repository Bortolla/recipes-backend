import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    // for debugging
    // log: ['query', 'info', 'warn', 'error']
});

export const getRecipesByIngredients = async (ingredients: string[], onlyFavorites = false) => {
    return prisma.recipe.findMany({
        where: {
            ingredients: {
                hasSome: ingredients,
            },
            ...(onlyFavorites && { isFavorite: true }),
        },
    });
};

export const getAllRecipes = async (onlyFavorites = false) => {
    return prisma.recipe.findMany({
        where: {
            ...(onlyFavorites && { isFavorite: true }),
        },
    });
};

export const getRecipeById = async (id: string) => {
    return prisma.recipe.findUniqueOrThrow({
        where: { id },
    });
};

export const createRecipe = async (
    name: string,
    ingredients: string[],
    instructions: string,
    image?: string,
    isFavorite: boolean = false
) => {
    return prisma.recipe.create({
        data: {
            name,
            ingredients,
            instructions,
            image,
            isFavorite
        },
    });
};
