import type { CraftableItemMap } from '$lib/models/CraftableItem';
import { InGameItemsEnum } from '../../enums/InGameItemsEnum';

export const blackDragonhideCraftableSpecs = {
    [InGameItemsEnum.BLACK_DRAGONHIDE_VAMBRACES]: {
        imageName: 'black-dragonhide-vambraces.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 79 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.BLACK_DRAGON_LEATHER,
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
    [InGameItemsEnum.BLACK_DRAGONHIDE_CHAPS]: {
        imageName: 'black-dragonhide-chaps.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 82 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.BLACK_DRAGON_LEATHER,
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
    [InGameItemsEnum.BLACK_DRAGONHIDE_BODY]: {
        imageName: 'black-dragonhide-body.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 84 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.BLACK_DRAGON_LEATHER,
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
