import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.f3dab370.js","_app/immutable/chunks/scheduler.01108d45.js","_app/immutable/chunks/index.71c964aa.js","_app/immutable/chunks/navigation.aedf3075.js","_app/immutable/chunks/singletons.6fa09559.js"];
export const stylesheets = ["_app/immutable/assets/0.945c2d2c.css"];
export const fonts = [];
