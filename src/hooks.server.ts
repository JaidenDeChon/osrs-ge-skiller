import { populateGameItemCaches } from '$lib/caches/gameItemCache';

await populateGameItemCaches();

// Update cached game items every minute.
setInterval(populateGameItemCaches, 60000);
