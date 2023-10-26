import type { CraftableItemMap } from '$lib/models/CraftableItem';
import { InGameItemsEnum } from '../../enums/InGameItemsEnum';

export const greenDragonhideCraftableSpecs = {
    [InGameItemsEnum.GREEN_DRAGONHIDE_VAMBRACES]: {
        imageName: 'green-dragonhide-vambraces.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 57 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.GREEN_DRAGON_LEATHER,
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
    [InGameItemsEnum.GREEN_DRAGONHIDE_CHAPS]: {
        imageName: 'green-dragonhide-chaps.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 60 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.GREEN_DRAGON_LEATHER,
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
    [InGameItemsEnum.GREEN_DRAGONHIDE_BODY]: {
        imageName: 'green-dragonhide-body.png',
        levelsRequired: [{ skillName: 'crafting', skillLevel: 63 }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.GREEN_DRAGON_LEATHER,
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
