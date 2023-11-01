import type { GameItem } from '$lib/models/GameItem';
import type { FullMapDataCombined } from '$lib/models/GrandExchangeProtocols';

export function addMarketInfoToGameItem(gameItem: GameItem, geData: FullMapDataCombined): GameItem {
    // Take a copy of the given GameItem.
    const gameItemCopy: GameItem = { ...gameItem };

    // Grab market info on this game item.
    const itemGeData = geData[gameItemCopy.id];

    // Add examine text.
    gameItemCopy.examineText = itemGeData.examine;

    // High/low alchemy values.
    gameItemCopy.highAlch = itemGeData.highalch;
    gameItemCopy.lowAlch = itemGeData.lowalch;

    // High/low prices and their times.
    gameItemCopy.highPrice = itemGeData.highPrice;
    gameItemCopy.highTime = itemGeData.highTime;
    gameItemCopy.lowPrice = itemGeData.lowPrice;
    gameItemCopy.lowTime = itemGeData.lowTime;

    // Recursively do the same for all GameItem child ingredients.
    if (gameItemCopy.creationSpecs) {
        for (const creationSpec of gameItemCopy.creationSpecs) {
            for (const ingredient of creationSpec.ingredients) {
                addMarketInfoToGameItem(ingredient.item, geData);
            }
        }
    }

    return gameItemCopy;
}
 
export function addMarketInfoToGameItems(gameItems: GameItem[], geData: FullMapDataCombined): GameItem[] {
    const items: GameItem[] = [];
    for (const gameItem of gameItems) items.push(addMarketInfoToGameItem(gameItem, geData));
    return items;
}
