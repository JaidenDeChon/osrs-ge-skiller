import type { GameItem } from '$lib/models/GameItem';
import type { GameItemKeysEnum } from '$lib/enums/GameItemKeysEnum';
import { GameItemIdsEnum } from '$lib/enums/GameItemIdsEnum';
import { GameItemNamesEnum } from '$lib/enums/GameItemNamesEnum';
import { GameItemImageFilenamesEnum } from '$lib/enums/GameItemImageFilenamesEnum';

export function assembleGameItem(gameItemEnumsKey: GameItemKeysEnum): GameItem {
    const id = GameItemIdsEnum[gameItemEnumsKey];
    const name = GameItemNamesEnum[gameItemEnumsKey];
    const image = GameItemImageFilenamesEnum[gameItemEnumsKey];

    return { id, name, image };
}
 