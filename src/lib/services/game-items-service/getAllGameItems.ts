import type { GameItem, GameItemsBySkill } from '$lib/models/GameItem';
import { geDataCombined } from '../grand-exchange-api-service';
import { addMarketInfoToGameItems } from '$lib/helpers/addMarketInfoToGameItem';
import * as CreationTrees from '$lib/constants/crafting-item-creation-trees';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';

export async function populateGameItems(
    items: GameItem[],
    itemsBySkill: GameItemsBySkill[],
    resetLists = false
): Promise<void> {
    // Grab GE data for use in populating the `items` and `itemsByCategory` arrays.
    const geData = await geDataCombined();

    // Empty the lists.
    if (resetLists) {
        items.length = 0;
        itemsBySkill.length = 0;
    }

    // Processes the given GameItem objects and adds to the lists.
    function completeGameItemsAndAddToLists(
        skillName: InGameSkillNamesEnum,
        gameItemsToComplete: GameItem[],
        categoryName: string,
    ): void {
        // Ensure the itemsBySkill list has the skill entry we require.
        let itemsBySkillObject = itemsBySkill.find(obj => obj.skillName === skillName);
        if (!itemsBySkillObject) {
            const itemsBySkillNewLength = itemsBySkill.push({ skillName, categories: [] });
            itemsBySkillObject = itemsBySkill[itemsBySkillNewLength - 1];
        }
    
        // Complete the GameItems' data and add them to the lists.
        const completedItems = addMarketInfoToGameItems(gameItemsToComplete, geData);
        items.push(...completedItems);
        itemsBySkillObject.categories.push({ categoryName, items: completedItems })
    }

    // Leather armor.
    completeGameItemsAndAddToLists(
        InGameSkillNamesEnum.CRAFTING,
        CreationTrees.leatherItemTrees,
        'Leather armor'
    );

    // Snakeskin armor.
    completeGameItemsAndAddToLists(
        InGameSkillNamesEnum.CRAFTING,
        CreationTrees.snakeskinItemTrees,
        'Snakeskin armor'
    )

    // Blue d'hide armor.
    completeGameItemsAndAddToLists(
        InGameSkillNamesEnum.CRAFTING,
        CreationTrees.blueDragonhideItemTrees,
        'Blue d\'hide armor'
    )

    // Green d'hide armor.
    completeGameItemsAndAddToLists(
        InGameSkillNamesEnum.CRAFTING,
        CreationTrees.greenDragonhideItemTrees,
        'Green d\'hide armor'
    )

    // Red d'hide armor.
    completeGameItemsAndAddToLists(
        InGameSkillNamesEnum.CRAFTING,
        CreationTrees.redDragonhideItemTrees,
        'Red d\'hide armor'
    )

    // Black d'hide armor.
    completeGameItemsAndAddToLists(
        InGameSkillNamesEnum.CRAFTING,
        CreationTrees.blackDragonhideItemTrees,
        'Black d\'hide armor'
    )
}
