export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","item-images/black-dragon-leather.png","item-images/black-dragonhide-body.png","item-images/black-dragonhide-chaps.png","item-images/black-dragonhide-vambraces.png","item-images/blue-dragon-leather.png","item-images/blue-dragonhide-body.png","item-images/blue-dragonhide-chaps.png","item-images/blue-dragonhide-vambraces.png","item-images/coins-few.png","item-images/coins-lots.png","item-images/green-dragon-leather.png","item-images/green-dragonhide-body.png","item-images/green-dragonhide-chaps.png","item-images/green-dragonhide-vambraces.png","item-images/hammer.png","item-images/hard-leather-body.png","item-images/hard-leather.png","item-images/iron-nails.png","item-images/knife.png","item-images/leather-body.png","item-images/leather-boots.png","item-images/leather-chaps.png","item-images/leather-cowl.png","item-images/leather-gloves.png","item-images/leather-vambraces.png","item-images/leather.png","item-images/needle.png","item-images/red-dragon-leather.png","item-images/red-dragonhide-body.png","item-images/red-dragonhide-chaps.png","item-images/red-dragonhide-vambraces.png","item-images/snakeskin-bandana.png","item-images/snakeskin-body.png","item-images/snakeskin-boots.png","item-images/snakeskin-chaps.png","item-images/snakeskin-shield.png","item-images/snakeskin-vambraces.png","item-images/snakeskin.png","item-images/thread.png","item-images/willow-logs.png","item-images/willow-shield.png","spell-images/high-level-alchemy.png","spell-images/low-level-alchemy.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.f0462c44.js","app":"_app/immutable/entry/app.dfc0cab7.js","imports":["_app/immutable/entry/start.f0462c44.js","_app/immutable/chunks/scheduler.01108d45.js","_app/immutable/chunks/singletons.6fa09559.js","_app/immutable/entry/app.dfc0cab7.js","_app/immutable/chunks/scheduler.01108d45.js","_app/immutable/chunks/index.71c964aa.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/game-item-by-id",
				pattern: /^\/api\/game-item-by-id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/game-item-by-id/_server.ts.js'))
			},
			{
				id: "/api/game-items-by-skill",
				pattern: /^\/api\/game-items-by-skill\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/game-items-by-skill/_server.ts.js'))
			},
			{
				id: "/item-browser",
				pattern: /^\/item-browser\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/item-browser/[itemId]",
				pattern: /^\/item-browser\/([^/]+?)\/?$/,
				params: [{"name":"itemId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
