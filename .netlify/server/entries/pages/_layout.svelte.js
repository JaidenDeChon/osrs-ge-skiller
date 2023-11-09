import { c as create_ssr_component } from "../../chunks/ssr.js";
import { a as afterNavigate, d as disableScrollHandling } from "../../chunks/navigation.js";
const base = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  afterNavigate(() => {
    disableScrollHandling();
    setTimeout(
      () => {
        scrollTo({ top: 0, behavior: "instant" });
      },
      400
    );
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<header class="container" data-svelte-h="svelte-13kl420"><nav><ul><li><strong>ge-skiller</strong></li></ul> <ul><li><a href="/">Home</a></li> <li><a href="/item-browser">Item Browser</a></li></ul></nav></header> <main class="container">${slots.default ? slots.default({}) : ``}</main> <footer class="container"></footer>`;
});
export {
  Layout as default
};
