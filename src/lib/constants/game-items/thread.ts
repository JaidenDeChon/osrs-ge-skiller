import type { GameItem } from '$lib/models/GameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';

export function thread(): GameItem {
    return assembleGameItem(GameItemEnumKeysEnum.THREAD);
}
