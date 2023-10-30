import type { PageServerLoad } from './$types';
import { addMarketInfoToGameItems } from '$lib/helpers/addMarketInfoToGameItem';
import { geDataCombined } from '$lib/services/grand-exchange-service';
import {
    leatherItemTrees,
    snakeskinItemTrees,
    blueDragonhideItemTrees,
    greenDragonhideItemTrees,
    redDragonhideItemTrees,
    blackDragonhideItemTrees
} from '$lib/constants/crafting-item-creation-trees';

export const load: PageServerLoad = async({ fetch }) => {
    const geData = await geDataCombined(fetch);

    const leatherItems = leatherItemTrees;
    const snakeskinItems = snakeskinItemTrees;
    const blueDragonhideItems = blueDragonhideItemTrees;
    const greenDragonhideItems = greenDragonhideItemTrees;
    const redDragonhideItems = redDragonhideItemTrees;
    const blackDragonhideItems = blackDragonhideItemTrees;

    addMarketInfoToGameItems(leatherItems, geData);
    addMarketInfoToGameItems(snakeskinItems, geData);
    addMarketInfoToGameItems(blueDragonhideItems, geData);
    addMarketInfoToGameItems(greenDragonhideItems, geData);
    addMarketInfoToGameItems(redDragonhideItems, geData);
    addMarketInfoToGameItems(blackDragonhideItems, geData);

    const creatableItems = [
        {
            name: 'Leather armor',
            items: leatherItems
        },
        {
            name: 'Snakeskin armor',
            items: snakeskinItems
        },
        {
            name: 'Blue d\'hide armor',
            items: blueDragonhideItems
        },
        {
            name: 'Green d\'hide armor',
            items: greenDragonhideItems
        },
        {
            name: 'Black d\'hide armor',
            items: blackDragonhideItems
        },
        {
            name: 'Red d\'hide armor',
            items: redDragonhideItems
        }
    ];

    return { creatableItems }
};
