import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';

export function hardLeather(): GameItem {
    return assembleGameItem(GameItemEnumKeysEnum.HARD_LEATHER);
};
