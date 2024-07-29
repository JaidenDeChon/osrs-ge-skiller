import mongoose from 'mongoose';

export interface IGameItemPricing {
    associatedGameItemDocId: mongoose.Types.ObjectId;
    highPrice: number;
    lowPrice: number;
    highTime: number;
    lowTime: number;
}

const gameItemPricingSchema = new mongoose.Schema<IGameItemPricing>({
    associatedGameItemDocId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameItem',
        required: true
    },
    highPrice: Number,
    lowPrice: Number,
    highTime: Number,
    lowTime: Number,
});

let GameItemPricingModel: mongoose.Model<IGameItemPricing>;

if (mongoose.models.GameItemPricing) {
    GameItemPricingModel = mongoose.models.GameItemPricing;
} else {
    GameItemPricingModel = mongoose.model<IGameItemPricing>('GameItemPricing', gameItemPricingSchema, 'game-item-pricing');
}

export { GameItemPricingModel}
