import type { GameItem } from '$lib/models/GameItem';
import { snakeskinBoots } from '../game-items/snakeskinBoots';
import { snakeskinVambraces } from '../game-items/snakeskinVambraces';
import { snakeskinBandana } from '../game-items/snakeskinBandana';
import { snakeskinChaps } from '../game-items/snakeskinChaps';
import { snakeskinBody } from '../game-items/snakeskinBody';
import { snakeskinShield } from '../game-items/snakeskinShield';

export const snakeskinItemTrees: GameItem[] = [
    snakeskinBoots(),
    snakeskinVambraces(),
    snakeskinBandana(),
    snakeskinChaps(),
    snakeskinBody(),
    snakeskinShield()
];
