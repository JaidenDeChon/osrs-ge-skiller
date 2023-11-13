import type { GameItem } from '$lib/models/GameItem';
import { assembleGameItem } from '$lib/helpers/assembleGameItem';
import { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';

export function blueDragonLeather(): GameItem {
    return assembleGameItem(GameItemEnumKeysEnum.BLUE_DRAGON_LEATHER);
};
