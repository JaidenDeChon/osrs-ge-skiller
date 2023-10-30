import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';

export function ironNails(): GameItem {
    return assembleGameItem(GameItemEnumKeysEnum.IRON_NAILS);
};
