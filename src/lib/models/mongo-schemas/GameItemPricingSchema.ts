import mongoose from 'mongoose';

interface IGameItemPricing {
    associatedGameItemDocId: mongoose.Types.ObjectId;
    highPrice: number;
    lowPrice: number;
    highTime: Date;
    lowTime: Date;
    highAlch: number;
    lowAlch: number;
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
    highAlch: Number,
    lowAlch: Number
});

export const GameItemPricingCollection = mongoose.model<IGameItemPricing>('GameItemPricing', gameItemPricingSchema);
