import type { MapDataCombined } from './GrandExchangeProtocols';

export type CraftingIngredient = {
    id: string;
    amountRequired: number;
    itemData?: MapDataCombined;
}
