import type { GameItem } from '$lib/models/GameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';

export function snakeskin(): GameItem {
    return assembleGameItem(GameItemKeysEnum.SNAKESKIN);
}
