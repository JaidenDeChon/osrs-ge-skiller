import type { RequestHandler } from '@sveltejs/kit';
import { getItemById } from '$lib/caches/gameItemCache';

export const GET: RequestHandler = async ({ url }) => {
    const itemId = url.searchParams.get('itemId');
    if (!itemId) return new Response(JSON.stringify({ 'bitching': 'No item ID was given' }));
    const foundItem = await getItemById(itemId);
    return new Response(JSON.stringify(foundItem));
};
