import { ObjectId } from 'bson';
import { GameItemModel } from '$lib/models/mongo-schemas/GameItemSchema';
import { GameItemPricingModel } from '$lib/models/mongo-schemas/GameItemPricingSchema';
import { GameItemCategoryModel } from '$lib/models/mongo-schemas/GameItemCategoriesSchema';
import { GameItemSkillsModel } from '$lib/models/mongo-schemas/GameItemSkillsSchema';
import type { GameItemCreationIngredient, GameItem, GameItemsByCategory, GameItemsBySkill } from '$lib/models/GameItem';

/**
 * Populates the ingredients for a given game item recursively.
 * @param gameItemId - The ID of the game item.
 * @param visited - A set of visited game item IDs to detect circular dependencies.
 * @returns A promise that resolves to an array of populated game item ingredients.
 * @throws An error if a circular dependency is detected.
 */
async function populateIngredients(gameItemId: string, visited: Set<string>): Promise<GameItemCreationIngredient[]> {
    // Check for circular dependency.
    if (visited.has(gameItemId)) {
        const errorString = `Circular dependency detected for GameItem ID: ${gameItemId}`;
        console.error(errorString);
        throw new Error(errorString);
    }

    // Mark the current item as visited.
    visited.add(gameItemId);

    // Find the GameItem document with the given ID.
    const gameItem = await GameItemModel.findOne({ id: gameItemId });

    if (!gameItem || !gameItem.creationSpecs?.ingredients) return [];

    // Map each ingredient to include its nested ingredients
    const populatedIngredients = await Promise.all(gameItem.creationSpecs.ingredients.map(async ingredient => {
        const nestedIngredients = await populateIngredients(ingredient.item.id, new Set(visited));

        return {
            consumedDuringCreation: ingredient.consumedDuringCreation,
            amount: ingredient.amount,
            item: {
                ...ingredient.item,
                creationSpecs: {
                    // Ensure experienceGranted and requiredSkills are handled correctly
                    experienceGranted: ingredient.item.creationSpecs?.experienceGranted ?? [],
                    requiredSkills: ingredient.item.creationSpecs?.requiredSkills ?? [],
                    ingredients: nestedIngredients
                }
            }
        };
    }));

    return populatedIngredients;
}

/**
 * Returns an array of GameItems, sorted by skill and category.
 */
export async function buildGameItemTrees(): Promise<
    { finishedGameItems: GameItem[]; finishedSkills: GameItemsBySkill[] }
> {
    const finishedGameItems = [] as GameItem[];
    const finishedCategories = [] as GameItemsByCategory[];
    const finishedSkills = [] as GameItemsBySkill[];

    // Fetch all GameItem, GameItemPricing, GameItemCategory, and GameItemSkills documents from the MongoDB collections.
    const [gameItems, gameItemPricing, gameItemCategories, gameItemSkills] = await Promise.all([
        GameItemModel.find(),
        GameItemPricingModel.find(),
        GameItemCategoryModel.find(),
        GameItemSkillsModel.find()
    ]);

    const gameItemPricingMap = new Map(gameItemPricing.map(p => [p.associatedGameItemDocId.toString(), p]));

    // Fully assemble each GameItem. This includes populating the ingredients recursively.
    for (const item of gameItems) {
        const pricing = gameItemPricingMap.get(item._id.toString());

        try {
            const populatedIngredients = await populateIngredients(item.id, new Set());

            // Convert Mongoose document to a plain JavaScript object.
            const plainObjectItem = item.toObject() as GameItem;

            finishedGameItems.push({
                ...plainObjectItem,
                highPrice: pricing?.highPrice,
                highTime: pricing?.highTime,
                lowPrice: pricing?.lowPrice,
                lowTime: pricing?.lowTime,
                creationSpecs: {
                    experienceGranted: plainObjectItem.creationSpecs?.experienceGranted ?? [],
                    requiredSkills: plainObjectItem.creationSpecs?.requiredSkills ?? [],
                    ingredients: populatedIngredients
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Populate the finishedCategories array.
    gameItemCategories.forEach(category => {
        const finishedCategory = {} as GameItemsByCategory;
        finishedCategory.categoryName = category.categoryName;
        finishedCategory.items = finishedGameItems
            .filter(item => {
                // Find the MongoDB ID of the item.
                const id = gameItems.find(i => i.id === item.id)?._id.toString() ?? ''
                return category.items.includes(ObjectId.createFromHexString(id));
            });

        finishedCategories.push(finishedCategory);
    });

    // Populate the finishedSkills array.
    gameItemSkills.forEach(skill => {
        const finishedSkill = {} as GameItemsBySkill;
        finishedSkill.skillName = skill.skillName;
        finishedSkill.categories = finishedCategories
            .filter(category => {
                // Find the MongoDB ID of the category.
                const id = gameItemCategories.find(c => c.categoryName === category.categoryName)?._id.toString() ?? '';
                return skill.categories.includes(ObjectId.createFromHexString(id))
            });

        finishedSkills.push(finishedSkill);
    });

    return { finishedGameItems, finishedSkills };
}
