import type { CraftableItemMap } from '$lib/models/CraftableItem';
import { InGameItemsEnum } from '../../enums/InGameItemsEnum';

export const leatherCraftableSpecs = {
    // Leather gloves
    [InGameItemsEnum.LEATHER_GLOVES]: {
        imageName: 'leather-gloves.png',
        levelsRequired: [{
            skillLevel: 1,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.LEATHER,
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
        ]
    },

    // Leather boots
    [InGameItemsEnum.LEATHER_BOOTS]: {
        imageName: 'leather-boots.png',
        levelsRequired: [{
            skillLevel: 7,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.LEATHER,
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
        ]
    },

    // Leather cowl
    [InGameItemsEnum.LEATHER_COWL]: {
        imageName: 'leather-cowl.png',
        levelsRequired: [{
            skillLevel: 9,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.LEATHER,
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
        ]
    },

    // Leather vambraces
    [InGameItemsEnum.LEATHER_VAMBRACES]: {
        imageName: 'leather-vambraces.png',
        levelsRequired: [{
            skillLevel: 11,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.LEATHER,
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
        ]
    },

    // Leather body
    [InGameItemsEnum.LEATHER_BODY]: {
        imageName: 'leather-body.png',
        levelsRequired: [{
            skillLevel: 14,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.LEATHER,
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
        ]
    },

    // Leather chaps
    [InGameItemsEnum.LEATHER_CHAPS]: {
        imageName: 'leather-chaps.png',
        levelsRequired: [{
            skillLevel: 18,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.LEATHER,
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
        ]
    },

    // Hard leather body
    [InGameItemsEnum.HARD_LEATHER_BODY]: {
        imageName: 'hard-leather-body.png',
        levelsRequired: [{ skillLevel: 28, skillName: 'crafting' }],
        consumableIngredients: [
            {
                id: InGameItemsEnum.HARD_LEATHER,
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
        ]
    }
} as CraftableItemMap;
