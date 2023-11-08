import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';
import { snakeskin } from './snakeskin';
import { ironNails } from './ironNails';
import { willowShield } from './willowShield';

export function snakeskinShield(): GameItem {
    const gameItem = assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN_SHIELD);
    gameItem.creationSpecs = {
        experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 100 }],
        requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 56 }],
        ingredients: [
            {
                item: snakeskin(),
                amount: 2,
                consumedDuringCreation: true
            },
            {
                item: ironNails(),
                amount: 15,
                consumedDuringCreation: true
            },
            {
                item: willowShield(),
                amount: 1,
                consumedDuringCreation: true
            }
        ]
    };

    return gameItem;
};
