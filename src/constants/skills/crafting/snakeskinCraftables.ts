import type { CraftableItemMap } from '$lib/models/CraftableItem';
import { InGameItemsEnum } from '../../enums/InGameItemsEnum';

export const snakeskinCraftableSpecs = {
    [InGameItemsEnum.SNAKESKIN_BOOTS]: {
        imageName: 'snakeskin-boots.png',
        levelsRequired: [{
            skillLevel: 45,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.SNAKESKIN,
                amountRequired: 6
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
        ]
    },
    [InGameItemsEnum.SNAKESKIN_VAMBRACES]: {
        imageName: 'snakeskin-vambraces.png',
        levelsRequired: [{
            skillLevel: 47,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.SNAKESKIN,
                amountRequired: 8
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
        ]
    },
    [InGameItemsEnum.SNAKESKIN_BANDANA]: {
        imageName: 'snakeskin-bandana.png',
        levelsRequired: [{
            skillLevel: 48,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.SNAKESKIN,
                amountRequired: 5
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
        ]
    },
    [InGameItemsEnum.SNAKESKIN_CHAPS]: {
        imageName: 'snakeskin-chaps.png',
        levelsRequired: [{
            skillLevel: 51,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.SNAKESKIN,
                amountRequired: 12
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
        ]
    },
    [InGameItemsEnum.SNAKESKIN_BODY]: {
        imageName: 'snakeskin-body.png',
        levelsRequired: [{
            skillLevel: 53,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.SNAKESKIN,
                amountRequired: 15
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
        ]
    },
    [InGameItemsEnum.SNAKESKIN_SHIELD]: {
        imageName: 'snakeskin-shield.png',
        levelsRequired: [{
            skillLevel: 56,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.SNAKESKIN,
                amountRequired: 2
            },
            {
                id: InGameItemsEnum.WILLOW_SHIELD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: InGameItemsEnum.HAMMER,
                amountRequired: 1
            }
        ]
    },
} as CraftableItemMap;
