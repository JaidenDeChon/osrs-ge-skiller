import mongoose from 'mongoose';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import type { GameItemCreationSpecs } from '../GameItem';

export interface IGameItem {
    id: string;
    name: string;
    image: string;
    creationSpecs?: GameItemCreationSpecs;
}

export const gameItemSchema = new mongoose.Schema<IGameItem>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    creationSpecs: {
        experienceGranted: [
            {
                skillName: {
                    type: String,
                    enum: InGameSkillNamesEnum
                },
                experienceAmount: Number
            }
        ],
        requiredSkills: [
            {
                skillName: { type: String, enum: InGameSkillNamesEnum },
                skillLevel: Number
            }
        ],
        ingredients: [
            new mongoose.Schema({
                consumedDuringCreation: Boolean,
                amount: Number,
                // Recursively reference another GameItem
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'GameItem'
                }
            }, { _id: false })
        ]
    }
});

export const GameItemModel = mongoose.model<IGameItem>('GameItem', gameItemSchema, 'game-items');
