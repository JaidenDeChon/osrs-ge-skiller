import type { CraftableItemMap } from '$lib/models/CraftableItem';
import { InGameItemsEnum } from '../../enums/InGameItemsEnum';

export const blueDragonhideCraftableSpecs = {
    [InGameItemsEnum.BLUE_DRAGONHIDE_VAMBRACES]: {
        imageName: 'blue-dragonhide-vambraces.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 66 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.BLUE_DRAGON_LEATHER,
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
    [InGameItemsEnum.BLUE_DRAGONHIDE_CHAPS]: {
        imageName: 'blue-dragonhide-chaps.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 68 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.BLUE_DRAGON_LEATHER,
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
    [InGameItemsEnum.BLUE_DRAGONHIDE_BODY]: {
        imageName: 'blue-dragonhide-body.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 71 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.BLUE_DRAGON_LEATHER,
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
