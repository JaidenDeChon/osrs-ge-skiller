import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';
import { greenDragonLeather } from './greenDragonLeather';
import { thread } from './thread';
import { needle } from './needle';

export function greenDragonhideVambraces(): GameItem {
    const gameItem = assembleGameItem(GameItemEnumKeysEnum.GREEN_DRAGONHIDE_VAMBRACES);
    gameItem.creationSpecs = {
        experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 62 }],
        requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 57 }],
        ingredients: [
            {
                item: greenDragonLeather(),
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
