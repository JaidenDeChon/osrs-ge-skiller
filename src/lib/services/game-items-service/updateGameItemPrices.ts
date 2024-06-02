import type { AnyBulkWriteOperation } from 'mongodb';
import { GameItemModel } from '$lib/models/mongo-schemas/GameItemSchema';
import { GameItemPricingModel } from '$lib/models/mongo-schemas/GameItemPricingSchema';
import { CollectionMetadataModel } from '$lib/models/mongo-schemas/CollectionMetadataSchema';
import { geDataCombined } from '../grand-exchange-api-service';

/**
 * Updates the prices of all GameItems in the database.
 */
export async function updateGameItemsService() {
    // Get API prices.
    const prices = await geDataCombined();

    // Fetch all GameItem documents from the MongoDB collection.
    const gameItems = await GameItemModel.find();

    // For every item in gameItems, find the matching item in gameItemPricing and update its prices.
    const bulkOperations: AnyBulkWriteOperation[] = [];
    gameItems.forEach(async (item) => {
        const pricing = prices[item.id];
        if (pricing) {
            bulkOperations.push({
                updateOne: {
                    filter: { associatedGameItemDocId: item._id },
                    update: {
                        highPrice: pricing.highPrice,
                        highTime: pricing.highTime,
                        lowPrice: pricing.lowPrice,
                        lowTime: pricing.lowTime,
                    },
                    upsert: true, // Create a new document if it doesn't exist.
                },
            })
        };
    });

    // Update the prices in the database.
    await GameItemPricingModel.bulkWrite(bulkOperations);

    // Update the collection metadata.
    let collectionMetadata = await CollectionMetadataModel.findOne({ collectionName: 'game-item-pricing' });
    if (!collectionMetadata) {
        collectionMetadata = new CollectionMetadataModel({ collectionName: 'game-item-pricing' });
    }
    collectionMetadata.lastUpdated = Date.now();
    await collectionMetadata.save();
}

/**
 * Checks the age of the cached game item prices. If they are older than 5 minutes, updates them.
 */
export async function updatePricesIfNeeded() {
    // Get the last time the game item prices were updated.
    const collectionMetadata = await CollectionMetadataModel.findOne({ collectionName: 'game-item-pricing' });
    const lastUpdated = collectionMetadata?.lastUpdated ?? 0;

    // If the last update was more than 5 minutes ago, update the prices.
    if (Date.now() - lastUpdated > 300000) {
        await updateGameItemsService();
    }
}
