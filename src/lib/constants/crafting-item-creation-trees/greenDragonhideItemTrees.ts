import type { GameItem } from '$lib/models/GameItem';
import { greenDragonhideVambraces } from '../game-items/greenDragonhideVambraces';
import { greenDragonhideChaps } from '../game-items/greenDragonhideChaps';
import { greenDragonhideBody } from '../game-items/greenDragonhideBody';

export const greenDragonhideItemTrees: GameItem[] = [
    greenDragonhideVambraces(),
    greenDragonhideChaps(),
    greenDragonhideBody()
];
