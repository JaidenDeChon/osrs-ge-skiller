import mongoose from 'mongoose';
import { GameItemCateogoryNamesEnum } from '$lib/enums/GameItemCategoryNamesEnum';

export interface IGameItemCategory {
    categoryName: GameItemCateogoryNamesEnum;
    items: mongoose.Types.ObjectId[];
}

export const gameItemCategoriesSchema = new mongoose.Schema<IGameItemCategory>({
    categoryName: {
        type: String,
        enum: GameItemCateogoryNamesEnum
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GameItem'
        }
    ]
});

export const GameItemCategoryModel = mongoose.model<IGameItemCategory>('GameItemCategory', gameItemCategoriesSchema, 'game-item-categories');
