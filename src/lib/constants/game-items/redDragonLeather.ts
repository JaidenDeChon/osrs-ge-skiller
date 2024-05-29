import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';

export function redDragonLeather(): GameItem {
    return assembleGameItem(GameItemKeysEnum.RED_DRAGON_LEATHER);
};
