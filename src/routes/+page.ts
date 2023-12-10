import type { PageLoad } from './$types';
import type { GameItemsBySkill } from '$lib/models/GameItem';

export const load: PageLoad = async ({ fetch, url }) => {
    const { pathname } = url;
    const response = await fetch('/api/game-items-by-skill');
    const gameItemsBySkill: GameItemsBySkill[] = await response.json();
    return { gameItemsBySkill, pathname };
};
