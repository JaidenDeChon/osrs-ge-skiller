import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';
import { blueDragonLeather } from './blueDragonLeather';
import { thread } from './thread';
import { needle } from './needle';

export function blueDragonhideChaps(): GameItem {
    const gameItem = assembleGameItem(GameItemEnumKeysEnum.BLUE_DRAGONHIDE_CHAPS);
    gameItem.creationSpecs = {
        experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 140 }],
        requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 68 }],
        ingredients: [
            {
                item: blueDragonLeather(),
                amount: 2,
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
