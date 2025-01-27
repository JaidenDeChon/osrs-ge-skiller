import type { GameItem } from '$lib/models/GameItem';
import {
    leatherGloves,
    leatherBoots,
    leatherCowl,
    leatherVambraces,
    leatherBody,
    leatherChaps,
    hardLeatherBody
} from '../game-items';

export const leatherItemTrees: GameItem[] = [
    leatherGloves(),
    leatherBoots(),
    leatherCowl(),
    leatherVambraces(),
    leatherBody(),
    leatherChaps(),
    hardLeatherBody()
];
