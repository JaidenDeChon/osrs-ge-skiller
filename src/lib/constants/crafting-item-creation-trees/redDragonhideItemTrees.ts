import type { GameItem } from '$lib/models/GameItem';
import { redDragonhideVambraces } from '../game-items/redDragonhideVambraces';
import { redDragonhideChaps } from '../game-items/redDragonhideChaps';
import { redDragonhideBody } from '../game-items/redDragonhideBody';

export const redDragonhideItemTrees: GameItem[] = [
    redDragonhideVambraces(),
    redDragonhideChaps(),
    redDragonhideBody()
];
