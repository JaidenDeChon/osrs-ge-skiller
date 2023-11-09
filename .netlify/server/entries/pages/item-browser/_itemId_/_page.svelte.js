import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component, b as each, a as subscribe } from "../../../../chunks/ssr.js";
import { o as onNavigate } from "../../../../chunks/navigation.js";
import { w as writable } from "../../../../chunks/index.js";
import "d3";
import { t as timeSince } from "../../../../chunks/timeSince.js";
const materialCostLowStore = writable(0);
const materialCostHighStore = writable(0);
const GameItemIngredientsTree_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".game-item-ingredients-tree.svelte-1sowaj9{width:fit-content;margin:0 auto}",
  map: null
};
const treeHeight = 200;
let treeWidth = 400;
const GameItemIngredientsTree = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { gameItem } = $$props;
  if ($$props.gameItem === void 0 && $$bindings.gameItem && gameItem !== void 0)
    $$bindings.gameItem(gameItem);
  $$result.css.add(css$3);
  return `<div class="game-item-ingredients-tree svelte-1sowaj9"><svg class="game-item-ingredients-tree__tree"${add_attribute("width", treeWidth, 0)}${add_attribute("height", treeHeight + 100, 0)} viewBox="${"0 0 " + escape(treeWidth, true) + " " + escape(treeHeight, true)}"><g transform=""><g class="links"></g><g class="nodes"></g></g></svg> </div>`;
});
const ImageWithText_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".image-with-text.svelte-srrxqa.svelte-srrxqa{display:flex;align-items:center;gap:1em}.image-with-text.svelte-srrxqa img.svelte-srrxqa{width:1.6em;object-fit:contain}.image-with-text > *{margin-bottom:0}.image-with-text span{font-size:0.75em;color:var(--muted-color)}",
  map: null
};
const ImageWithText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { alt } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  $$result.css.add(css$2);
  return `<div class="image-with-text svelte-srrxqa"><img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} class="svelte-srrxqa"> ${slots.default ? slots.default({}) : ``} </div>`;
});
const GameItemNested_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".game-item-nested.svelte-1tpyziw.svelte-1tpyziw{border:0.1em solid;padding:1em;margin-top:1rem;border-radius:var(--border-radius)}.game-item-nested__title.svelte-1tpyziw.svelte-1tpyziw{display:flex;align-items:center;gap:1em;margin-bottom:1em}.game-item-nested__title.svelte-1tpyziw img.svelte-1tpyziw{height:2em;width:2em;object-fit:contain}.game-item-nested__title.svelte-1tpyziw p.svelte-1tpyziw{margin-bottom:0}.game-item-nested__values-container.svelte-1tpyziw.svelte-1tpyziw{display:flex;gap:3em}.game-item-nested__values.svelte-1tpyziw.svelte-1tpyziw{margin-bottom:1em;display:flex;flex-direction:column;gap:0.6em;margin:0 auto}.game-item-nested__ingredients.svelte-1tpyziw.svelte-1tpyziw{margin-top:1rem}.game-item-nested.svelte-1tpyziw details.svelte-1tpyziw{margin-top:1.5em;margin-bottom:0}.muted.svelte-1tpyziw.svelte-1tpyziw{color:var(--muted-color)}.image-with-text{flex:1}.game-item-nested .game-item-nested .game-item-nested__values{flex-direction:row;justify-content:space-around;width:100%;margin:0 auto}.game-item-nested .game-item-nested .game-item-nested__values .image-with-text{flex:unset;margin-bottom:1em}@media(prefers-color-scheme: dark){.game-item-nested.svelte-1tpyziw.svelte-1tpyziw{background-color:rgba(255, 255, 255, 0.03);border-color:transparent}}@media(prefers-color-scheme: light){.game-item-nested.svelte-1tpyziw.svelte-1tpyziw{border-color:rgb(237, 240, 243);box-shadow:var(--card-box-shadow)}.game-item-nested__ingredients .game-item-nested{border-width:0.12em !important;box-shadow:none !important}}",
  map: null
};
const GameItemNested = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let countsTowardValue;
  let { gameItem } = $$props;
  let { isParent = false } = $$props;
  let { amount = 1 } = $$props;
  if ($$props.gameItem === void 0 && $$bindings.gameItem && gameItem !== void 0)
    $$bindings.gameItem(gameItem);
  if ($$props.isParent === void 0 && $$bindings.isParent && isParent !== void 0)
    $$bindings.isParent(isParent);
  if ($$props.amount === void 0 && $$bindings.amount && amount !== void 0)
    $$bindings.amount(amount);
  $$result.css.add(css$1);
  countsTowardValue = true;
  amount * (gameItem.highPrice ?? 0);
  amount * (gameItem.lowPrice ?? 0);
  return `<div class="game-item-nested svelte-1tpyziw"> <div class="game-item-nested__title svelte-1tpyziw"><img src="${"/item-images/" + escape(gameItem.image, true)}"${add_attribute("alt", gameItem.name, 0)} class="svelte-1tpyziw"> <p class="svelte-1tpyziw">${escape(gameItem.name)}</p> ${!isParent ? `<p class="muted svelte-1tpyziw">(x ${escape(amount)})</p>` : ``}</div> <div class="game-item-nested__values-container svelte-1tpyziw"> <div class="game-item-nested__values svelte-1tpyziw">${validate_component(ImageWithText, "ImageWithText").$$render(
    $$result,
    {
      src: "/item-images/coins-few.png",
      alt: "Just a few coins."
    },
    {},
    {
      default: () => {
        return `<p>${escape(gameItem.lowPrice)} ${gameItem.lowTime ? `<span>(${escape(timeSince(gameItem.lowTime, true))})</span>` : ``}</p>`;
      }
    }
  )} ${validate_component(ImageWithText, "ImageWithText").$$render(
    $$result,
    {
      src: "/item-images/coins-lots.png",
      alt: "Lots of coins!"
    },
    {},
    {
      default: () => {
        return `<p>${escape(gameItem.highPrice)} ${gameItem.highTime ? `<span>(${escape(timeSince(gameItem.highTime, true))})</span>` : ``}</p>`;
      }
    }
  )}</div>  ${isParent ? `<div class="game-item-nested__values svelte-1tpyziw">${validate_component(ImageWithText, "ImageWithText").$$render(
    $$result,
    {
      src: "/spell-images/low-level-alchemy.png",
      alt: "Low level alchemy"
    },
    {},
    {
      default: () => {
        return `<p>${escape(gameItem.highAlch)}</p>`;
      }
    }
  )} ${validate_component(ImageWithText, "ImageWithText").$$render(
    $$result,
    {
      src: "/spell-images/high-level-alchemy.png",
      alt: "High level alchemy"
    },
    {},
    {
      default: () => {
        return `<p>${escape(gameItem.lowAlch)}</p>`;
      }
    }
  )}</div>` : ``}</div>   ${!isParent ? `<label><input type="checkbox"${add_attribute("checked", countsTowardValue, 1)}>
            Include in materials cost</label>` : ``} ${gameItem.creationSpecs && gameItem.creationSpecs.ingredients ? `<details class="game-item-nested__ingredients svelte-1tpyziw"><summary data-svelte-h="svelte-wkcb6w">Ingredients</summary> ${each(gameItem.creationSpecs.ingredients, (ingredient) => {
    return `${validate_component(GameItemNested, "svelte:self").$$render(
      $$result,
      {
        gameItem: ingredient.item,
        amount: ingredient.amount
      },
      {},
      {}
    )}`;
  })}</details>` : ``} </div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".individual-item-page__header.svelte-1n0myvd.svelte-1n0myvd{display:flex;gap:1rem}.individual-item-page__header-image-container.svelte-1n0myvd.svelte-1n0myvd{height:6rem;width:6rem;display:flex;align-items:center;justify-content:center;background-color:var(--card-sectionning-background-color);border-radius:50%}.individual-item-page__header.svelte-1n0myvd img.svelte-1n0myvd{width:4.4rem;height:4.4rem;object-fit:contain}.individual-item-page__tree-container.svelte-1n0myvd.svelte-1n0myvd{margin:2rem auto}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let itemDetails;
  let $materialCostLowStore, $$unsubscribe_materialCostLowStore;
  let $materialCostHighStore, $$unsubscribe_materialCostHighStore;
  $$unsubscribe_materialCostLowStore = subscribe(materialCostLowStore, (value) => $materialCostLowStore = value);
  $$unsubscribe_materialCostHighStore = subscribe(materialCostHighStore, (value) => $materialCostHighStore = value);
  let { data } = $$props;
  onNavigate(() => {
    materialCostLowStore.set(0);
    materialCostHighStore.set(0);
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  itemDetails = data.itemDetails;
  $$unsubscribe_materialCostLowStore();
  $$unsubscribe_materialCostHighStore();
  return `<div class="individual-item-page__header svelte-1n0myvd"><div class="individual-item-page__header-image-container svelte-1n0myvd"><img src="${"/item-images/" + escape(itemDetails.image, true)}"${add_attribute("alt", itemDetails.name, 0)} class="svelte-1n0myvd"></div> <hgroup><h1>${escape(itemDetails.name)}</h1> <h2>${escape(itemDetails.examineText)}</h2></hgroup></div>  <div class="individual-item-page__tree-container svelte-1n0myvd">${validate_component(GameItemIngredientsTree, "GameItemIngredientsTree").$$render($$result, { gameItem: itemDetails }, {}, {})}</div> <table role="grid"><thead data-svelte-h="svelte-hh5a81"><tr><th scope="col"></th> <th scope="colgroup">Low</th> <th scope="colgroup">High</th></tr></thead> <tbody><tr><th scope="row" data-svelte-h="svelte-r1093c">GE Value</th> <td>${escape(itemDetails.lowPrice)}</td> <td>${escape(itemDetails.highPrice)}</td></tr> <tr><th scope="row" data-svelte-h="svelte-axywb7">Material cost</th> <td>${escape(Math.ceil($materialCostLowStore))}</td> <td>${escape(Math.ceil($materialCostHighStore))}</td></tr> <tr><th scope="row" data-svelte-h="svelte-15n6m4v">Profit after materials</th> <td>${escape(itemDetails.lowPrice ? Math.ceil(itemDetails.lowPrice - $materialCostLowStore) : "Insufficient data")}</td> <td>${escape(itemDetails.highPrice ? Math.ceil(itemDetails.highPrice - $materialCostHighStore) : "Insufficient data")}</td></tr></tbody></table> ${validate_component(GameItemNested, "GameItemNested").$$render($$result, { gameItem: itemDetails, isParent: true }, {}, {})}`;
});
export {
  Page as default
};
