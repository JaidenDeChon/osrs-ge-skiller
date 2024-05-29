import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';

export function hardLeather(): GameItem {
    return assembleGameItem(GameItemKeysEnum.HARD_LEATHER);
};
