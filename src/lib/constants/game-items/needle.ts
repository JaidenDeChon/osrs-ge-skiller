import type { GameItem } from '$lib/models/GameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';

export function needle(): GameItem {
    return assembleGameItem(GameItemKeysEnum.NEEDLE);
}
