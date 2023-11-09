

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.536e9885.js","_app/immutable/chunks/scheduler.01108d45.js","_app/immutable/chunks/index.71c964aa.js","_app/immutable/chunks/navigation.aedf3075.js","_app/immutable/chunks/singletons.6fa09559.js"];
export const stylesheets = [];
export const fonts = [];
