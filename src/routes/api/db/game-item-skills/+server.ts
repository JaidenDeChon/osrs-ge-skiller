import { dev } from '$app/environment';
import { json, type RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { GameItemSkillsModel } from '$lib/models/mongo-schemas/GameItemSkillsSchema';

export const POST = (async ({ request }) => {
    if (!dev) return json({ error: 'Forbidden in production' }, { status: 403 });

    // Get the data for the new game item/skill relationship.
    const skillCategoryPair = await request.json() as { skillName: string; categoryId: string; };

    const skillName = skillCategoryPair.skillName.toLowerCase();

    // Get or create the skill.
    const skill = await GameItemSkillsModel.findOneAndUpdate({ skillName }, { skillName }, { upsert: true, new: true });

    // Add the new category to the skill.
    skill.categories.push(new ObjectId(skillCategoryPair.categoryId));

    try {
        const result = await skill.save();
        return json(result);
    } catch (e) {
        throw new Error(e);
    }
}) satisfies RequestHandler;

/**
 * Allows for getting all documents from the game-item-skills mongoDB collection.
 */
export const GET = (async () => {
    try {
        const skills = await GameItemSkillsModel.find({});
        return json(skills.map(skill => skill.skillName));
    } catch (e) {
        return json({ error: e.message }, { status: 500 })
    }
}) satisfies RequestHandler;
