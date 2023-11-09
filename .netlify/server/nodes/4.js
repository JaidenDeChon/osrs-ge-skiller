import * as universal from '../entries/pages/item-browser/_itemId_/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/item-browser/_itemId_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/item-browser/[itemId]/+page.ts";
export const imports = ["_app/immutable/nodes/4.df3978c2.js","_app/immutable/chunks/scheduler.01108d45.js","_app/immutable/chunks/index.71c964aa.js","_app/immutable/chunks/navigation.aedf3075.js","_app/immutable/chunks/singletons.6fa09559.js","_app/immutable/chunks/timeSince.cbd9a49e.js"];
export const stylesheets = ["_app/immutable/assets/4.892392d9.css"];
export const fonts = [];
