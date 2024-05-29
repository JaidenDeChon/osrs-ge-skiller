import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';

export function greenDragonLeather(): GameItem {
    return assembleGameItem(GameItemKeysEnum.GREEN_DRAGON_LEATHER);
};
 