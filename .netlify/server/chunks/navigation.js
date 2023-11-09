function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const disableScrollHandling = /* @__PURE__ */ client_method("disable_scroll_handling");
const onNavigate = /* @__PURE__ */ client_method("on_navigate");
const afterNavigate = /* @__PURE__ */ client_method("after_navigate");
export {
  afterNavigate as a,
  disableScrollHandling as d,
  onNavigate as o
};
