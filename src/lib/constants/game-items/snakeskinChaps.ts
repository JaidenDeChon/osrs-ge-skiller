import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';
import { snakeskin } from './snakeskin';
import { thread } from './thread';
import { needle } from './needle';

export function snakeskinChaps(): GameItem {
    const gameItem = assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN_CHAPS);
    gameItem.creationSpecs = {
        experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 50 }],
        requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 51 }],
        ingredients: [
            {
                item: snakeskin(),
                amount: 12,
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
