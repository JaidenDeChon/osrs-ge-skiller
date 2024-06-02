import type { RequestHandler } from '@sveltejs/kit';
import { getItemById } from '$lib/caches/gameItemCache';

export const GET: RequestHandler = async ({ url }) => {
    const itemId = url.searchParams.get('itemId') ?? undefined;
    const foundItem = await getItemById(itemId);
    return new Response(JSON.stringify(foundItem));
};
