import { p as populateGameItemCaches } from "./gameItemCache.js";
await populateGameItemCaches();
setInterval(populateGameItemCaches, 6e4);
