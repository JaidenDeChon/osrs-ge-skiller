import mongoose from 'mongoose'

export interface IMetadata {
    collectionName: string;
    lastUpdated: number;
}

const MetadataSchema = new mongoose.Schema<IMetadata>({
    collectionName: String,
    lastUpdated: {
        type: Number,
        default: Date.now
    }
});

let CollectionMetadataModel: mongoose.Model<IMetadata>;

if (mongoose.models.Metadata) {
    CollectionMetadataModel = mongoose.models.Metadata;
} else {
    CollectionMetadataModel = mongoose.model('Metadata', MetadataSchema, 'metadata');
}

export { CollectionMetadataModel };
