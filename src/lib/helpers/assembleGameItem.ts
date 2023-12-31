import type { GameItem } from '$lib/models/GameItem';
import type { GameItemEnumKeysEnum } from '$lib/enums/GameItemEnumKeysEnum';
import { GameItemIdsEnum } from '$lib/enums/GameItemIdsEnum';
import { GameItemNamesEnum } from '$lib/enums/GameItemNamesEnum';
import { GameItemImageFilenamesEnum } from '$lib/enums/GameItemImageFilenamesEnum';

export function assembleGameItem(gameItemEnumsKey: GameItemEnumKeysEnum): GameItem {
    const id = GameItemIdsEnum[gameItemEnumsKey];
    const name = GameItemNamesEnum[gameItemEnumsKey];
    const image = GameItemImageFilenamesEnum[gameItemEnumsKey];

    return { id, name, image };
}
 