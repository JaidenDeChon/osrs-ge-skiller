import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';
import { blueDragonLeather } from './blueDragonLeather';
import { thread } from './thread';
import { needle } from './needle';

export function blueDragonhideBody(): GameItem {
    const gameItem = assembleGameItem(GameItemKeysEnum.BLUE_DRAGONHIDE_BODY);
    gameItem.creationSpecs = {
        experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 210 }],
        requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 71 }],
        ingredients: [
            {
                item: blueDragonLeather(),
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
};
