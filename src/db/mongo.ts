import mongoose from 'mongoose';

// MongoDB connection string setup.
const user = import.meta.env.VITE_MONGO_USERNAME;
const pw = import.meta.env.VITE_MONGO_PASSWORD;
const cluster = import.meta.env.VITE_MONGO_DB_CLUSTER_NAME;
const host = import.meta.env.VITE_MONGO_DB_HOST;
const dbName = import.meta.env.VITE_MONGO_DB_DB_NAME;
const prepend = 'mongodb+srv';
const append = '?retryWrites=true&w=majority';
const connectionString = `${prepend}://${user}:${pw}@${cluster}.${host}/${dbName}${append}`;

export async function startMongo(): Promise<void> {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(connectionString);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export const db = mongoose.connection;
