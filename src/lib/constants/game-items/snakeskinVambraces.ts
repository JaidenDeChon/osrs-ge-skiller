import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';
import { snakeskin } from './snakeskin';
import { thread } from './thread';
import { needle } from './needle';

export function snakeskinVambraces(): GameItem {
    const gameItem = assembleGameItem(GameItemKeysEnum.SNAKESKIN_VAMBRACES);
    gameItem.creationSpecs = {
        experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 35 }],
        requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 47 }],
        ingredients: [
            {
                item: snakeskin(),
                amount: 8,
                consumedDuringCreation: true
            },
            {
                item: thread(),
                amount: 0.2,
                consumedDuringCreation: true
            },
            {
                item: needle(),
                amount: 1,
                consumedDuringCreation: false
            }
        ]
    };

    return gameItem;
};
