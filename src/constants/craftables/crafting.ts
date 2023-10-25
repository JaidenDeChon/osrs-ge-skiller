import type { CraftableItemMap } from '$lib/models/CraftableItem';

export const enum CraftableItemIdsEnum {
    LEATHER_GLOVES = '1059',
    LEATHER_BOOTS = '1061',
    LEATHER_COWL = '1167',
    LEATHER_VAMBRACES = '1063',
    LEATHER_BODY = '1129',
    LEATHER_CHAPS = '1095',
    HARD_LEATHER_BODY = '1131',

    SNAKESKIN_BOOTS = '6328',
    SNAKESKIN_VAMBRACES = '6330',
    SNAKESKIN_BANDANA = '6326',
    SNAKESKIN_CHAPS = '6324',
    SNAKESKIN_BODY = '6322',
    SNAKESKIN_SHIELD = '22272',
}

export const enum CraftingIngredientIdsEnum {
    LEATHER = '1741',
    HARD_LEATHER = '1743',
    SNAKESKIN = '6289',
    THREAD = '1734',
    NEEDLE = '1733',
    WILLOW_SHIELD = '22254',
    IRON_NAILS = '4820',
    HAMMER = '2347'
}

export const leatherCraftableSpecs = {
    // Leather gloves
    [CraftableItemIdsEnum.LEATHER_GLOVES]: {
        imageName: 'leather-gloves.png',
        levelsRequired: [{
            skillLevel: 1,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.LEATHER,
                amountRequired: 1
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },

    // Leather boots
    [CraftableItemIdsEnum.LEATHER_BOOTS]: {
        imageName: 'leather-boots.png',
        levelsRequired: [{
            skillLevel: 7,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.LEATHER,
                amountRequired: 1
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },

    // Leather cowl
    [CraftableItemIdsEnum.LEATHER_COWL]: {
        imageName: 'leather-cowl.png',
        levelsRequired: [{
            skillLevel: 9,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.LEATHER,
                amountRequired: 1
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },

    // Leather vambraces
    [CraftableItemIdsEnum.LEATHER_VAMBRACES]: {
        imageName: 'leather-vambraces.png',
        levelsRequired: [{
            skillLevel: 11,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.LEATHER,
                amountRequired: 1
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },

    // Leather body
    [CraftableItemIdsEnum.LEATHER_BODY]: {
        imageName: 'leather-body.png',
        levelsRequired: [{
            skillLevel: 14,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.LEATHER,
                amountRequired: 1
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },

    // Leather chaps
    [CraftableItemIdsEnum.LEATHER_CHAPS]: {
        imageName: 'leather-chaps.png',
        levelsRequired: [{
            skillLevel: 18,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.LEATHER,
                amountRequired: 1
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },

    // Hard leather body
    [CraftableItemIdsEnum.HARD_LEATHER_BODY]: {
        imageName: 'hard-leather-body.png',
        levelsRequired: [{ skillLevel: 28, skillName: 'crafting' }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.HARD_LEATHER,
                amountRequired: 1
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    }
} as CraftableItemMap;

export const snakeskinCraftableSpecs = {
    [CraftableItemIdsEnum.SNAKESKIN_BOOTS]: {
        imageName: 'snakeskin-boots.png',
        levelsRequired: [{
            skillLevel: 45,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.SNAKESKIN,
                amountRequired: 6
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },
    [CraftableItemIdsEnum.SNAKESKIN_VAMBRACES]: {
        imageName: 'snakeskin-vambraces.png',
        levelsRequired: [{
            skillLevel: 47,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.SNAKESKIN,
                amountRequired: 8
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },
    [CraftableItemIdsEnum.SNAKESKIN_BANDANA]: {
        imageName: 'snakeskin-bandana.png',
        levelsRequired: [{
            skillLevel: 48,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.SNAKESKIN,
                amountRequired: 5
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },
    [CraftableItemIdsEnum.SNAKESKIN_CHAPS]: {
        imageName: 'snakeskin-chaps.png',
        levelsRequired: [{
            skillLevel: 51,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.SNAKESKIN,
                amountRequired: 12
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },
    [CraftableItemIdsEnum.SNAKESKIN_BODY]: {
        imageName: 'snakeskin-body.png',
        levelsRequired: [{
            skillLevel: 53,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.SNAKESKIN,
                amountRequired: 15
            },
            {
                id: CraftingIngredientIdsEnum.THREAD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.NEEDLE,
                amountRequired: 1
            }
        ]
    },
    [CraftableItemIdsEnum.SNAKESKIN_SHIELD]: {
        imageName: 'snakeskin-shield.png',
        levelsRequired: [{
            skillLevel: 56,
            skillName: 'crafting'
        }],
        consumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.SNAKESKIN,
                amountRequired: 2
            },
            {
                id: CraftingIngredientIdsEnum.WILLOW_SHIELD,
                amountRequired: 1
            }
        ],
        nonConsumableIngredients: [
            {
                id: CraftingIngredientIdsEnum.HAMMER,
                amountRequired: 1
            }
        ]
    },
} as CraftableItemMap;
