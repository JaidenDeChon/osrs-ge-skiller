import { populateGameItemCaches } from '$lib/caches/gameItemCache';
import { startMongo } from '$db/mongo';

// Establish MongoDB connection.
await startMongo().then(() => console.log('MongoDB connection established.'));

// Update cached game items every minute.
await populateGameItemCaches();
setInterval(populateGameItemCaches, 60000);
