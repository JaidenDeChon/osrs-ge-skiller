import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';

export function blueDragonLeather(): GameItem {
    return assembleGameItem(GameItemKeysEnum.BLUE_DRAGON_LEATHER);
};
