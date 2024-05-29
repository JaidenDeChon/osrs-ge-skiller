import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';

export function willowLogs(): GameItem {
    return assembleGameItem(GameItemKeysEnum.WILLOW_LOGS);
};
