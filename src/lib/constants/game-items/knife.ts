import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';

export function knife(): GameItem {
    return assembleGameItem(GameItemKeysEnum.KNIFE);
};
