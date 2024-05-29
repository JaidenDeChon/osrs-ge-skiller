import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';

export function blackDragonLeather(): GameItem {
    return assembleGameItem(GameItemKeysEnum.BLACK_DRAGON_LEATHER);
};
