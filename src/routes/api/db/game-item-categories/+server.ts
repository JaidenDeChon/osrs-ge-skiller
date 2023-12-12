import { dev } from '$app/environment';
import { json, type RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { GameItemCategoryModel } from '$lib/models/mongo-schemas/GameItemCategoriesSchema';

/**
 * Allows for adding new items to the game-item-categories mongoDB collection.
 */
export const POST = (async ({ request }) => {
    if (!dev) return json({ error: 'Forbidden in production' }, { status: 403 });

    // Get the data for the new game item/category relationship.
    const gameItemCategoryPair = await request.json() as { categoryName: string; newItemId: string };

    // Get or create the category.
    const category = await GameItemCategoryModel.findOneAndUpdate(
        { categoryName: gameItemCategoryPair.categoryName },
        { categoryName: gameItemCategoryPair.categoryName },
        { upsert: true, new: true }
    );

    // Add the new item to the category.
    category.items.push(new ObjectId(gameItemCategoryPair.newItemId));

    try {
        const result = await category.save();
        return json(result);
    } catch (e) {
        throw new Error(e);
    }
}) satisfies RequestHandler;

/**
 * Allows for getting all documents from the game-item-categories mongoDB collection.
 */
export const GET = (async () => {
    try {
        const categories = await GameItemCategoryModel.find({});
        return json(categories.map(category => category.categoryName));
    } catch (e) {
        return json({ error: e.message }, { status: 500 })
    }
}) satisfies RequestHandler;
