import type { CraftableItemMap } from '$lib/models/CraftableItem';
import { InGameItemsEnum } from '../../enums/InGameItemsEnum';

export const redDragonhideCraftableSpecs = {
    [InGameItemsEnum.RED_DRAGONHIDE_VAMBRACES]: {
        imageName: 'red-dragonhide-vambraces.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 73 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.RED_DRAGON_LEATHER,
                amountRequired: 1
            },
            {
                id: InGameItemsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: InGameItemsEnum.NEEDLE,
                amountRequired: 1
            }
        ],
    },
    [InGameItemsEnum.RED_DRAGONHIDE_CHAPS]: {
        imageName: 'red-dragonhide-chaps.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 75 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.RED_DRAGON_LEATHER,
                amountRequired: 2
            },
            {
                id: InGameItemsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: InGameItemsEnum.NEEDLE,
                amountRequired: 1
            }
        ],
    },
    [InGameItemsEnum.RED_DRAGONHIDE_BODY]: {
        imageName: 'red-dragonhide-body.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 77 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.RED_DRAGON_LEATHER,
                amountRequired: 3
            },
            {
                id: InGameItemsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: InGameItemsEnum.NEEDLE,
                amountRequired: 1
            }
        ],
    },
 } as CraftableItemMap;
