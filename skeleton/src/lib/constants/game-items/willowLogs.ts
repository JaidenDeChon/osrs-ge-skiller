import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';

export function willowLogs(): GameItem {
    return assembleGameItem(GameItemEnumKeysEnum.WILLOW_LOGS);
};
