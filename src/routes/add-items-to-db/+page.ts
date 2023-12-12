import type { PageLoad } from './$types';
import type { GameItem } from '$lib/models/GameItem';

export const load: PageLoad = async ({ fetch }) => {
    const gameItemsResponse = await fetch('/api/db/game-item');
    const gameItems: GameItem[] = await gameItemsResponse.json();

    const categoriesResponse = await fetch('/api/db/game-item-categories');
    const categories = await categoriesResponse.json();

    const skillsResponse = await fetch('/api/db/game-item-skills');
    const skills = await skillsResponse.json();
    return { gameItems, categories, skills };
};
