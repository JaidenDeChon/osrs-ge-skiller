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

let GameItemSkillsModel: mongoose.Model<IGameItemSkill>;

if (mongoose.models.GameItemSkills) {
    GameItemSkillsModel = mongoose.models.GameItemSkills;
} else {
    GameItemSkillsModel = mongoose.model<IGameItemSkill>('GameItemSkills', gameItemSkillsSchema, 'game-item-skills');
}

export { GameItemSkillsModel };
