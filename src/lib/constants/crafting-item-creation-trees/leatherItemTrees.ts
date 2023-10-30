import type { GameItem } from '$lib/models/GameItem';
import { leatherGloves } from '../game-items/leatherGloves';
import { leatherBoots } from '../game-items/leatherBoots';
import { leatherCowl } from '../game-items/leatherCowl';
import { leatherVambraces } from '../game-items/leatherVambraces';
import { leatherBody } from '../game-items/leatherBody';
import { leatherChaps } from '../game-items/leatherChaps';
import { hardLeatherBody } from '../game-items/hardLeatherBody';

export const leatherItemTrees: GameItem[] = [
    leatherGloves(),
    leatherBoots(),
    leatherCowl(),
    leatherVambraces(),
    leatherBody(),
    leatherChaps(),
    hardLeatherBody()
];
