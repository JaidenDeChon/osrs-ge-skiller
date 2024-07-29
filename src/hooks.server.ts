import { startMongo } from '$db/mongo';
import { updatePricesIfNeeded } from '$lib/services/game-items-service/updateGameItemPrices';
import { populateGameItemCaches } from '$lib/caches/gameItemCache';

// Establish MongoDB connection.
await startMongo().then(() => console.log('MongoDB connection established.'));

// Check age of cached prices every minute. (Only updates if older than 5 minutes)
await updatePricesIfNeeded();
setInterval(updatePricesIfNeeded, 60000);

// Update cached game items every minute.
await populateGameItemCaches();
setInterval(populateGameItemCaches, 60000);
