import type { RequestHandler } from '@sveltejs/kit';
import type { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import { getItemsBySkill } from '$lib/caches/gameItemCache';

export const GET: RequestHandler = async ({ url }) => {
    const skillName = url.searchParams.get('skillName')

    let itemsByCategory;

    itemsByCategory = skillName
        ? await getItemsBySkill(skillName as InGameSkillNamesEnum)
        : await getItemsBySkill();

    return new Response(JSON.stringify(itemsByCategory));
}
