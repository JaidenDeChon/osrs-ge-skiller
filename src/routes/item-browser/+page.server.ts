import type { PageLoad } from './$types';
import { leatherCraftableSpecs, snakeskinCraftableSpecs } from '../../constants/craftables/crafting';
import { geDataCombined } from '$lib/services/grand-exchange-service';
import type { MapDataCombined } from '$lib/models/GrandExchangeProtocols';
import type { CraftableItem } from '$lib/models/CraftableItem';

export const load: PageLoad = async ({ fetch }) => {
    const geData = await geDataCombined(fetch);

    // Prepare data for leather items
    const leatherItems = leatherCraftableSpecs;
    Object.keys(leatherItems).forEach((itemId) => {
        const item = leatherItems[itemId];

        // Populate item data
        item.itemData = geData[itemId];

        // Populate item data of ingredients
        item.consumableIngredients.forEach(ingredient => {
            ingredient.itemData = geData[ingredient.id];
        });
        item.nonConsumableIngredients.forEach(ingredient => {
            ingredient.itemData = geData[ingredient.id];
        });
    });

    // Prepare data for snakeskin items
    const snakeskinItems = snakeskinCraftableSpecs;
    Object.keys(snakeskinItems).forEach((itemId) => {
        const item = snakeskinItems[itemId];

        // Populate item data
        item.itemData = geData[itemId];

        // Populate item data of ingredients
        item.consumableIngredients.forEach(ingredient => {
            ingredient.itemData = geData[ingredient.id];
        });
        item.nonConsumableIngredients.forEach(ingredient => {
            ingredient.itemData = geData[ingredient.id];
        });
    });

    const geDataArray = [] as MapDataCombined[];
    const leatherItemsArray = [] as CraftableItem[];
    const snakeskinItemsArray = [] as CraftableItem[];

    Object.keys(geData).forEach(itemId => {
        geDataArray.push(geData[itemId]);
    });

    Object.keys(leatherItems).forEach(itemId => {
        leatherItemsArray.push(leatherItems[itemId]);
    });

    Object.keys(snakeskinItems).forEach(itemId => {
        snakeskinItemsArray.push(snakeskinItems[itemId]);
    });

    return { geDataArray, leatherItemsArray, snakeskinItemsArray };
}
