import type { Document, Types } from 'mongoose';
import { ObjectId } from 'bson';
import { GameItemModel, type IGameItem } from '$lib/models/mongo-schemas/GameItemSchema';
import { GameItemPricingModel, type IGameItemPricing } from '$lib/models/mongo-schemas/GameItemPricingSchema';
import { GameItemCategoryModel, type  IGameItemCategory } from '$lib/models/mongo-schemas/GameItemCategoriesSchema';
import { GameItemSkillsModel } from '$lib/models/mongo-schemas/GameItemSkillsSchema';
import type { GameItemCreationIngredient, GameItem, GameItemsByCategory, GameItemsBySkill } from '$lib/models/GameItem';
import type { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';

type GameItemDocument = Document<unknown, object, IGameItem> & IGameItem & { _id: Types.ObjectId };
type GameItemPricingDocument = Document<unknown, object, IGameItemPricing> & IGameItemPricing & { _id: Types.ObjectId };
type GameItemCategoryDocument = Document<unknown, object, IGameItemCategory> & IGameItemCategory & {
    _id: Types.ObjectId
};

/**
 * Builds the GameItem trees. This includes populating the ingredients recursively.
 */
export async function buildGameItemTrees(): Promise<{
    finishedGameItems: GameItem[];
    finishedSkills: GameItemsBySkill[]
}> {
    // Grab documents from the MongoDB.
    const mongoGameItems = await GameItemModel.find();
    const mongoGameItemPricing = await GameItemPricingModel.find();
    const mongoGameItemCategories = await GameItemCategoryModel.find();
    const mongoGameItemSkills = await GameItemSkillsModel.find();

    // Create arrays to cache the finished items, categories, and skills.
    const finishedGameItems = [] as GameItem[];
    const finishedCategories = [] as GameItemsByCategory[];
    const finishedSkills = [] as GameItemsBySkill[];

    // Fully assemble each GameItem. This includes populating the ingredients recursively.
    // Once populated, place them in the finishedGameItems array as a cache of completed items.
    for (const item of mongoGameItems) {
        const assembledItem = buildGameItem(item, mongoGameItemPricing, finishedGameItems);
        finishedGameItems.push(await assembledItem);
    }

    // Populate the finishedCategories array.
    // Once populated, place them in the finishedCategories array as a cache of completed categories.
    mongoGameItemCategories.forEach(category => {
        const finishedCategory = buildGameItemCategory(category, finishedGameItems, mongoGameItems);
        finishedCategories.push(finishedCategory);
    });

    // Populate the finishedSkills array.
    // Once populated, place them in the finishedSkills array as a cache of completed skills.
    mongoGameItemSkills.forEach(skill => {
        const finishedSkill = buildGameItemSkill(skill, finishedCategories, mongoGameItemCategories);
        finishedSkills.push(finishedSkill);
    });

    return { finishedGameItems, finishedSkills };
}

/**
 * Fully builds a GameItem given a GameItemDocument. This includes populating the ingredients recursively.
 * @param item - The GameItemDocument to build.
 * @param mongoGameItemPricing - The GameItemPricingDocuments to use for pricing.
 * @param finishedGameItems - The GameItems that have already been built.
 * @returns A fully built GameItem.
 */
async function buildGameItem(
    item: GameItemDocument,
    mongoGameItemPricing: GameItemPricingDocument[],
    finishedGameItems: GameItem[]
): Promise<GameItem> {
    const pricing = mongoGameItemPricing.find(p => p.associatedGameItemDocId.equals(item._id));
    const ingredients: GameItemCreationIngredient[] = [];

    // Guard clause
    if (!item.creationSpecs?.ingredients) {
        return constructGameItemObject(item, pricing, ingredients);
    }

    for (const ingredient of item.creationSpecs.ingredients) {
        let ingredientItem: GameItem;
        // Check if the ingredient item is already in the finishedGameItems array.
        const finishedItem = finishedGameItems.find(i => i.id === ingredient.item.id);
        if (finishedItem) {
            // If it is, use it directly.
            ingredientItem = finishedItem;
        } else {
            // Otherwise, fetch the GameItem from the database.
            const ingredientItemDoc = await GameItemModel.findById(ingredient.item);
            ingredientItem = await buildGameItem(
                ingredientItemDoc as GameItemDocument,
                mongoGameItemPricing,
                finishedGameItems
            );
        }
        ingredients.push({
            ...ingredient,
            item: ingredientItem
        });
    }

    return constructGameItemObject(item, pricing, ingredients);
}

/**
 * Constructs a GameItem object. Separated into its own function for readability and to avoid code duplication.1
 * @param item - The GameItemDocument to build.
 * @param pricing - The GameItemPricingDocument to use for pricing.
 * @param ingredients - The GameItemCreationIngredients to use for ingredients.
 * @returns A fully built GameItem.
 */
function constructGameItemObject(
    item: GameItemDocument,
    pricing: GameItemPricingDocument | undefined,
    ingredients: GameItemCreationIngredient[]
): GameItem {
    return {
        id: item.id,
        name: item.name,
        examineText: item.examineText,
        image: item.image,
        highAlch: item.highAlch,
        lowAlch: item.lowAlch,
        highPrice: pricing?.highPrice,
        highTime: pricing?.highTime,
        lowPrice: pricing?.lowPrice,
        lowTime: pricing?.lowTime,
        creationSpecs: {
            experienceGranted: item.creationSpecs?.experienceGranted ?? [],
            requiredSkills: item.creationSpecs?.requiredSkills ?? [],
            ingredients
        }
    };
}

/**
 * Builds a GameItemCategory given a GameItemCategoryDocument. This includes populating the items in the category with
 * the fully-built GameItems.
 * @param category - The GameItemCategoryDocument to build.
 * @param finishedGameItems - The GameItems that have already been built.
 * @param mongoGameItems - The GameItemDocuments to use for building the items in the category.
 * @returns A fully built GameItemCategory.
 */
function buildGameItemCategory(
    category: GameItemCategoryDocument,
    finishedGameItems: GameItem[],
    mongoGameItems: GameItemDocument[]
): GameItemsByCategory {
    const finishedCategory = {} as GameItemsByCategory;
    finishedCategory.categoryName = category.categoryName;
    finishedCategory.items = finishedGameItems
        .filter(item => {
            // Find the MongoDB ID of the item.
            const id = mongoGameItems.find(i => i.id === item.id)?._id.toString() ?? ''
            return category.items.includes(ObjectId.createFromHexString(id));
        });

    return finishedCategory;
}

/**
 * Builds a GameItemSkill given a GameItemSkillDocument. This includes populating the categories in the skill with
 * the fully-built GameItemCategories.
 * @param skill - The GameItemSkillDocument to build.
 * @param finishedCategories - The GameItemCategories that have already been built.
 * @param mongoGameItemCategories - The GameItemCategoryDocuments to use for populating the categories in the skill.
 * @returns A fully built GameItemSkill.
 */
function buildGameItemSkill(
    skill: { skillName: string, categories: Types.ObjectId[] },
    finishedCategories: GameItemsByCategory[],
    mongoGameItemCategories: GameItemCategoryDocument[]
): GameItemsBySkill {
    const finishedSkill = {} as GameItemsBySkill;
    finishedSkill.skillName = skill.skillName as InGameSkillNamesEnum;
    finishedSkill.categories = finishedCategories
        .filter(category => {
            // Find the MongoDB ID of the category.
            const id = mongoGameItemCategories.find(c =>
                c.categoryName === category.categoryName
            )?._id.toString() ?? '';
            return skill.categories.includes(ObjectId.createFromHexString(id))
        });

    return finishedSkill;
}
