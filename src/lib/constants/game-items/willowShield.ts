import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';
import { willowLogs } from './willowLogs';
import { knife } from './knife';

export function willowShield(): GameItem {
    const gameItem = assembleGameItem(GameItemKeysEnum.WILLOW_SHIELD);
    gameItem.creationSpecs = {
        experienceGranted: [{ skillName: InGameSkillNamesEnum.FLETCHING, experienceAmount: 83 }],
        requiredSkills: [{ skillName: InGameSkillNamesEnum.FLETCHING, skillLevel: 42 }],
        ingredients: [
            {
                item: willowLogs(),
                amount: 8,
                consumedDuringCreation: true
            },
            {
                item: knife(),
                amount: 1,
                consumedDuringCreation: true
            }
        ]
    };

    return gameItem;
};
