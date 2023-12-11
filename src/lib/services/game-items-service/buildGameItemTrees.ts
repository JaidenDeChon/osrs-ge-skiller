import { ObjectId } from 'bson';
import { GameItemModel } from '$lib/models/mongo-schemas/GameItemSchema';
import { GameItemPricingModel } from '$lib/models/mongo-schemas/GameItemPricingSchema';
import { GameItemCategoryModel } from '$lib/models/mongo-schemas/GameItemCategoriesSchema';
import { GameItemSkillsModel } from '$lib/models/mongo-schemas/GameItemSkillsSchema';
import type { GameItem, GameItemsByCategory, GameItemsBySkill } from '$lib/models/GameItem';

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

    // Fully assemble each GameItem.
    gameItems.forEach(item => {
        const pricing = gameItemPricingMap.get(item._id.toString());
        finishedGameItems.push({
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
            creationSpecs: item.creationSpecs
        });
    });

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
