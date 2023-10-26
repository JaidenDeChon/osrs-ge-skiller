import type { CraftableItemMap, CraftableItemWithGeData, MapDataCombinedWithImage } from '$lib/models/CraftableItem';
import type { CraftingIngredient } from '$lib/models/CraftingIngredient';
import type { FullMapDataCombined } from '$lib/models/GrandExchangeProtocols';

/**
 * Combines craftable item mappings with their respective GE data, and returns the result as an object ready to be
 * added to an iterable for easy usage in a +page.svelte file.
 *
 * @param name { string } The name of the collection. Displayed as-is in DOM.
 * @param craftableItemSpecs { CraftableItemMap } Mapping of item numbers to CraftableItem objects.
 * @param geData { FullMapDataCombined } Return value from `geDataCombined` function.
 * @returns A `CraftableItemWithGeData` object for adding to a collection thereof to give to +page.svelte file.
 */
export function assembleCraftableItemCollection (
    name: string,
    craftableItemSpecs: CraftableItemMap,
    geData: FullMapDataCombined
): CraftableItemWithGeData {
    const collection = { name, data: [] } as CraftableItemWithGeData;
    const items = { ...craftableItemSpecs };

    // Add GE data to every ingredient of every craftable item.
    Object.keys(items).forEach((itemId) => {
        const item = items[itemId];
        item.itemData = geData[itemId];

        // Populate item data of ingredients.
        item.consumableIngredients.forEach((ingredient: CraftingIngredient) => {
            ingredient.itemData = geData[ingredient.id];
        });
        item.nonConsumableIngredients.forEach((ingredient: CraftingIngredient) => {
            ingredient.itemData = geData[ingredient.id];
        });

        item.imageName = items[itemId].imageName;
    });

    // Add the data of the craftable items to the collection.
    Object.keys(items).forEach(itemId => collection.data.push(items[itemId].itemData as MapDataCombinedWithImage));

    // Finally, add the image to each item in the collection.
    collection.data.forEach(dataObject => {
        dataObject.imageName = Object
            .values(craftableItemSpecs)
            .find(item => item.itemData?.id === dataObject.id)?.imageName ?? '';
    });

    return collection;
}