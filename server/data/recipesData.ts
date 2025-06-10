import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    // for debugging
    // log: ['query', 'info', 'warn', 'error']
});

export const getRecipesByIngredients = async (ingredients: string[]) => {
    return prisma.recipe.findMany({
        where: {
            ingredients: {
                hasSome: ingredients,
            },
        },
    });
};

export const getAllRecipes = async () => {
    return prisma.recipe.findMany();
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
    image?: string
) => {
    return prisma.recipe.create({
        data: {
            name,
            ingredients,
            instructions,
            image,
        },
    });
};
