import type { GameItem } from '$lib/models/GameItem';
import type { FullMapDataCombined } from '$lib/models/GrandExchangeProtocols';

export function addMarketInfoToGameItem(gameItem: GameItem, geData: FullMapDataCombined): void {
    // Set market info on this game item.
    const itemGeData = geData[gameItem.id];
    gameItem.examineText = itemGeData.examine;

    // High/low alchemy values.
    gameItem.highAlch = itemGeData.highalch;
    gameItem.lowAlch = itemGeData.lowalch;

    // High/low prices and their times.
    gameItem.highPrice = itemGeData.highPrice;
    gameItem.highTime = itemGeData.highTime;
    gameItem.lowPrice = itemGeData.lowPrice;
    gameItem.lowTime = itemGeData.lowTime;

    // Recursively do the same for all GameItem child ingredients.
    if (gameItem.creationSpecs) {
        for (const creationSpec of gameItem.creationSpecs) {
            for (const ingredient of creationSpec.ingredients) {
                addMarketInfoToGameItem(ingredient.item, geData);
            }
        }
    }
}
 
export function addMarketInfoToGameItems(gameItems: GameItem[], geData: FullMapDataCombined): void {
    for (const gameItem of gameItems) {
        addMarketInfoToGameItem(gameItem, geData);
    }
}