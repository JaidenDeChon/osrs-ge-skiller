import type { MapDataCombined } from './GrandExchangeProtocols';
import type { CraftingIngredient } from './CraftingIngredient';
import type { LevelRequirement } from './LevelRequirement';

export type CraftableItem = {
    imageName?: string;
    itemData?: MapDataCombined;
    levelsRequired?: LevelRequirement[];
    consumableIngredients: CraftingIngredient[];
    nonConsumableIngredients: CraftingIngredient[];
};

export type CraftableItemMap = {
    [key: string]: CraftableItem
}

export type MapDataCombinedWithImage = MapDataCombined & { imageName: string };

export type CraftableItemWithGeData = { name: string; data: MapDataCombinedWithImage[]};
