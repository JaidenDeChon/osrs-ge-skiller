import type { GameItem } from '$lib/models/GameItem';
import { blueDragonhideVambraces } from '../game-items/blueDragonhideVambraces';
import { blueDragonhideChaps } from '../game-items/blueDragonhideChaps';
import { blueDragonhideBody } from '../game-items/blueDragonhideBody';

export const blueDragonhideItemTrees: GameItem[] = [
    blueDragonhideVambraces(),
    blueDragonhideChaps(),
    blueDragonhideBody()
];
