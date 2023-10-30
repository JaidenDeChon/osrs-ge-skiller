import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';
import { blackDragonLeather } from './blackDragonLeather';
import { thread } from './thread';
import { needle } from './needle';

export function blackDragonhideVambraces(): GameItem {
    const gameItem = assembleGameItem(GameItemEnumKeysEnum.BLACK_DRAGONHIDE_VAMBRACES);
    gameItem.creationSpecs?.push(
        {
            experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 86 }],
            requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 79 }],
            ingredients: [
                {
                    item: blackDragonLeather(),
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
        }
    );

    return gameItem;
};
