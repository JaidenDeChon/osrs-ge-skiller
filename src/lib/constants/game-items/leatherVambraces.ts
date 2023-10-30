import type { GameItem } from '$lib/models/GameItem';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';
import { leather } from './leather';
import { thread } from './thread';
import { needle } from './needle';

export function leatherVambraces(): GameItem {
    const gameItem = assembleGameItem(GameItemEnumKeysEnum.LEATHER_VAMBRACES);
    gameItem.creationSpecs?.push(
        {
            experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 22 }],
            requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 11 }],
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
        }
    );

    return gameItem;
};
