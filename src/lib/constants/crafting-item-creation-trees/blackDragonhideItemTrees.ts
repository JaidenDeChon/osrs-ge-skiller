import type { GameItem } from '$lib/models/GameItem';
import { blackDragonhideVambraces } from '../game-items/blackDragonhideVambraces';
import { blackDragonhideChaps } from '../game-items/blackDragonhideChaps';
import { blackDragonhideBody } from '../game-items/blackDragonhideBody';

export const blackDragonhideItemTrees: GameItem[] = [
    blackDragonhideVambraces(),
    blackDragonhideChaps(),
    blackDragonhideBody()
];
