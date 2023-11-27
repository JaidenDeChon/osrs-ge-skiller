import type { PageLoad } from './$types';
import type { GameItem } from '$lib/models/GameItem';

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('/api/db/game-item');
    const gameItems: GameItem[] = await response.json();
    return { gameItems };
};
