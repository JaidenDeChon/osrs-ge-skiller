import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';
import { leather } from './leather';
import { thread } from './thread';
import { needle } from './needle';

export function leatherGloves(): GameItem {
    const gameItem = assembleGameItem(GameItemKeysEnum.LEATHER_GLOVES);
    gameItem.creationSpecs = {
        experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 13.8 }],
        requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 1 }],
        ingredients: [
            {
                item: leather(),
                amount: 1,
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
}
