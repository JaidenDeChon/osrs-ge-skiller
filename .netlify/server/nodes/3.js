import * as universal from '../entries/pages/item-browser/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/item-browser/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/item-browser/+page.ts";
export const imports = ["_app/immutable/nodes/3.1cd297d4.js","_app/immutable/chunks/scheduler.01108d45.js","_app/immutable/chunks/index.71c964aa.js","_app/immutable/chunks/timeSince.cbd9a49e.js","_app/immutable/chunks/navigation.aedf3075.js","_app/immutable/chunks/singletons.6fa09559.js"];
export const stylesheets = ["_app/immutable/assets/3.539035a2.css"];
export const fonts = [];
