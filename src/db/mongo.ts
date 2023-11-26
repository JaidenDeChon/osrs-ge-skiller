import mongoose from 'mongoose';

// MongoDB connection string setup.
const mongoUser = import.meta.env.VITE_MONGO_USERNAME;
const mongoPw = import.meta.env.VITE_MONGO_PASSWORD;
const mongoDbName = import.meta.env.VITE_MONGO_DB_NAME;
const connectionStringPrepend = 'mongodb+srv';
const connectionStringAppend = '.0rgs67r.mongodb.net/?retryWrites=true&w=majority';
const connectionString = `${connectionStringPrepend}://${mongoUser}:${mongoPw}@${mongoDbName}${connectionStringAppend}`;

// const mongooseConnectInstance = await mongoose.connect(connectionString);
// const db = mongooseConnectInstance.connection;

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
