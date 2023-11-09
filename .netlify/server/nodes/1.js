

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.19b8806b.js","_app/immutable/chunks/scheduler.01108d45.js","_app/immutable/chunks/index.71c964aa.js","_app/immutable/chunks/singletons.6fa09559.js"];
export const stylesheets = [];
export const fonts = [];
