import type { ObjectIdLike } from "bson";
import { dev } from "$app/environment";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';
import { GameItemModel } from '$lib/models/mongo-schemas/GameItemSchema';

/**
 * Allows for adding new items to the game-items mongoDB collection.
 */
export const POST = (async ({ request }) => {
    if (!dev) return json({ error: 'Forbidden in production' }, { status: 403 });

    // Get the data for the new game item.
    const gameItemData = await request.json();

    // Convert each ingredient to MongoDB ObjectId.
    gameItemData.creationSpecs.ingredients = gameItemData.creationSpecs.ingredients.map(
        (ingredient: { item: string | number | ObjectId | Uint8Array | ObjectIdLike | undefined; }) => {
            if (ingredient.item) {
                return { ...ingredient, item: new ObjectId(ingredient.item) };
            }
            return ingredient;
        }
    );

    // Initialize a GameItemModel using the game item.
    const gameItemDocument = new GameItemModel(gameItemData);

    console.log('Item received: ', JSON.stringify(JSON.parse(JSON.stringify(gameItemData))));
    console.log('Attempting to save item...');

    try {
        const result = await gameItemDocument.save();
        console.log('Saved.');
        return json(result)
    } catch (e) {
        throw new Error(e);
    }
}) satisfies RequestHandler;

/**
 * Allows for getting all items, or a specific one by id, from the game-items mongoDB collection.
 */
export const GET = (async ({ url }) => {
    const id = url.searchParams.get('id');

    try {
        if (id) {
            const gameItem = await GameItemModel.findOne({ id });
            if (!gameItem) return json({ error: 'GameItem not found.' }, { status: 404 });
            return json(gameItem);
        } else {
            const gameItems = await GameItemModel.find({});
            return json(gameItems);
        }
    } catch (e) {
        return json({ error: e.message }, { status: 500 })
    }
}) satisfies RequestHandler;
