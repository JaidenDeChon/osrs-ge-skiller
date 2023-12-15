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

let GameItemCategoryModel: mongoose.Model<IGameItemCategory>;

if (mongoose.models.GameItemCategory) {
    GameItemCategoryModel = mongoose.models.GameItemCategory;
} else {
    GameItemCategoryModel = mongoose.model<IGameItemCategory>('GameItemCategory', gameItemCategoriesSchema, 'game-item-categories');
}

export { GameItemCategoryModel };

// export const GameItemCategoryModel = mongoose.model<IGameItemCategory>('GameItemCategory', gameItemCategoriesSchema, 'game-item-categories');
