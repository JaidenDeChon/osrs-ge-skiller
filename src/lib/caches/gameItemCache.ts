import type { GameItem, GameItemsBySkill } from '$lib/models/GameItem';
import type { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { populateGameItems } from '$lib/services/game-items-service/getAllGameItems';

// Full list of GameItems relevant to the app. Does not include every single GameItem.
const allGameItems = [] as GameItem[];

// GameItems separated by skill.
const itemsBySkill = [] as GameItemsBySkill[];

/**
 * Populates the game item lists.
 */
export async function populateGameItemCaches(): Promise<void> {
    // Reset arrays.
    allGameItems.length = 0;
    itemsBySkill.length = 0;

    await populateGameItems(allGameItems, itemsBySkill, true);
}

/**
 * Checks either list for empty state. If empty, calls function to populate them.
 */
export async function checkEmpty(): Promise<void> {
    if (!allGameItems.length || !itemsBySkill.length) await populateGameItemCaches();
}

/**
 * Retrieves a GameItem object using the given ID.
 * @param itemId The ID of the item to find.
 * @returns The found item, or null if not found.
 */
export async function getItemById(itemId: string): Promise<GameItem | null> {
    await checkEmpty();
    const foundItem = allGameItems.find(item => item.id === itemId);
    return foundItem ?? null;
}

/**
 * Retrieves the GameItemsByCategory object with the matching `categoryName`, or all of them if none is given.
 * @param categoryName The string name of the category of `GameItems` to retreive.
 * @returns The `GameItemsByCategory` object with `categoryName` property that matches the given name. Returns the
 *     entire `itemsByCategory` array if no category name is given. If one is given and no matching object can be
 *     found, returns `null`.
 */
export async function getItemsBySkill(
    skillName?: InGameSkillNamesEnum
): Promise<GameItemsBySkill[] | GameItemsBySkill | null> {
    await checkEmpty();
    if (skillName) return itemsBySkill.find(skill => skill.skillName === skillName) ?? null;
    else return itemsBySkill;
}

/**
 * Function for retrieving the list of all GameItems.
 * @returns The list of all GameItems.
 */
export async function getAllGameItems(): Promise<GameItem[]> {
    await checkEmpty();
    return allGameItems;
}
