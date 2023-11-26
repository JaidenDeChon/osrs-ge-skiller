import mongoose from 'mongoose';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';

interface IGameItemSkill {
    skillName: InGameSkillNamesEnum;
    categories: mongoose.Types.ObjectId[];
}

const gameItemSkillsSchema = new mongoose.Schema<IGameItemSkill>({
    skillName: {
        type: String,
        enum: InGameSkillNamesEnum,
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GameItemCategory'
        }
    ]
});

export const GameItemSkillsCollection = mongoose.model<IGameItemSkill>('GameItemSkills', gameItemSkillsSchema);
