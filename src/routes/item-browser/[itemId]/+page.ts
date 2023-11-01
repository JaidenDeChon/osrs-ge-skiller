import type { PageLoad } from './$types';
import type { GameItem } from '$lib/models/GameItem';

export const load: PageLoad = async ({ params, fetch }) => {
    const itemId = params.itemId;
    let itemDetails: GameItem;

    const searchParams = new URLSearchParams({ itemId });
    const response = await fetch('/api/game-item-by-id' + '?' + searchParams.toString());
    itemDetails = await response.json();
    return { itemDetails };
}
