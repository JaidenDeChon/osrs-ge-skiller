import mongoose from 'mongoose'

const MetadataSchema = new mongoose.Schema({
    collectionName: String,
    lastUpdated: {
        type: Number,
        default: Date.now
    }
});

export const CollectionMetadataModel = mongoose.model('Metadata', MetadataSchema, 'metadata');
