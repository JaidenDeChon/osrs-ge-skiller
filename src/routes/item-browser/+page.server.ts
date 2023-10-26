import type { PageLoad } from './$types';
import type { CraftableItemWithGeData } from '$lib/models/CraftableItem';
import { geDataCombined } from '$lib/services/grand-exchange-service';
import { assembleCraftableItemCollection } from '$lib/helpers/assembleCraftableItemCollection';
import {
    leatherCraftableSpecs,
    snakeskinCraftableSpecs,
    blackDragonhideCraftableSpecs,
    blueDragonhideCraftableSpecs,
    greenDragonhideCraftableSpecs,
    redDragonhideCraftableSpecs
} from '../../constants/skills/crafting';

export const load: PageLoad = async ({ fetch }) => {
    const geData = await geDataCombined(fetch);
    const craftableCollectionsByName = [] as CraftableItemWithGeData[];

    craftableCollectionsByName.push(
        assembleCraftableItemCollection('Leather', leatherCraftableSpecs, geData),
        assembleCraftableItemCollection('Snakeskin Armor', snakeskinCraftableSpecs, geData),
        assembleCraftableItemCollection('Blue Dragonhide Armor', blueDragonhideCraftableSpecs, geData),
        assembleCraftableItemCollection('Green Dragonhide Armor', greenDragonhideCraftableSpecs, geData),
        assembleCraftableItemCollection('Red Dragonhide Armor', redDragonhideCraftableSpecs, geData),
        assembleCraftableItemCollection('Black Dragonhide Armor', blackDragonhideCraftableSpecs, geData)
    );

    return { craftableCollectionsByName };
}
