import { c as create_ssr_component, b as each, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { t as timeSince } from "../../../chunks/timeSince.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#skill-selector-dropdown.svelte-3tf78z.svelte-3tf78z{margin-bottom:6rem}.gallery.svelte-3tf78z.svelte-3tf78z{display:flex;flex-wrap:wrap;gap:1em}.gallery.svelte-3tf78z article.card.svelte-3tf78z{width:100%;margin-top:0;margin-bottom:0}article.card.svelte-3tf78z header.svelte-3tf78z{display:flex;gap:1em}.card__image-container.svelte-3tf78z.svelte-3tf78z{height:3.3em !important;width:3.3em !important;display:flex;align-items:center;justify-content:center;background-color:var(--card-background-color);border-radius:50%}.card__image.svelte-3tf78z.svelte-3tf78z{height:2em;width:2em;object-fit:scale-down}article.card.svelte-3tf78z.svelte-3tf78z{padding-bottom:var(--block-spacing-horizontal)}article.card.svelte-3tf78z header hgroup.svelte-3tf78z{margin:0}article.card.svelte-3tf78z .card__content.svelte-3tf78z{display:flex;gap:1em;justify-content:space-evenly;margin-bottom:var(--block-spacing-vertical)}article.card.svelte-3tf78z .card__content-column.svelte-3tf78z{display:flex;flex-direction:column;gap:1em}.icon-text-group{display:flex;align-items:center;justify-content:flex-start;gap:1em}.icon-text-group img{width:1.6em}.icon-text-group p{margin-bottom:0}.icon-text-group p span{color:var(--muted-color)}article.card.svelte-3tf78z button.svelte-3tf78z{margin-bottom:0}@media(min-width: 1200px){.gallery.svelte-3tf78z article.card.svelte-3tf78z{width:calc(50% - 0.5rem)\r\n        }article.card.svelte-3tf78z .card__content.svelte-3tf78z{flex-direction:column}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let gameItemsBySkill;
  let categoriesForSelectedSkill;
  let { data } = $$props;
  let { selectedSkill = "crafting" } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.selectedSkill === void 0 && $$bindings.selectedSkill && selectedSkill !== void 0)
    $$bindings.selectedSkill(selectedSkill);
  $$result.css.add(css);
  gameItemsBySkill = data.gameItemsBySkill;
  categoriesForSelectedSkill = gameItemsBySkill.find((skill) => skill.skillName === selectedSkill)?.categories ?? [];
  return `<hgroup data-svelte-h="svelte-j654ah"><h1>Item browser</h1> <h2>Here we will see a gallery allowing us to browse items.</h2></hgroup> <select id="skill-selector-dropdown" class="svelte-3tf78z">${each(gameItemsBySkill, (skill) => {
    return `<option${add_attribute("value", skill.skillName, 0)}>${escape(skill.skillName)}</option>`;
  })}</select> ${each(categoriesForSelectedSkill, (category) => {
    return `<details><summary>${escape(category.categoryName)}</summary> <div class="gallery svelte-3tf78z">${each(category.items, (item) => {
      return `<article class="card svelte-3tf78z"><header class="svelte-3tf78z"><div class="card__image-container svelte-3tf78z"><img src="${"/item-images/" + escape(item.image, true)}"${add_attribute("alt", item.name, 0)} class="card__image svelte-3tf78z"></div> <hgroup class="card__title-container svelte-3tf78z"><h5>${escape(item.name)}</h5> <h6>${escape(item.examineText)}</h6> </hgroup></header> <div class="card__content svelte-3tf78z"><div class="card__content-column svelte-3tf78z"><div class="icon-text-group"><img src="/spell-images/low-level-alchemy.png" alt="high-level alchemy"> <p><span data-svelte-h="svelte-zedsup">Low alch -</span> ${escape(item.lowAlch)} </p></div> <div class="icon-text-group"><img src="/spell-images/high-level-alchemy.png" alt="high-level alchemy"> <p><span data-svelte-h="svelte-7c8yu1">High alch -</span> ${escape(item.highAlch)}</p> </div></div> <div class="card__content-column svelte-3tf78z"><div class="icon-text-group"><img src="/item-images/coins-few.png" alt="low-price icon"> <p>${escape(item.lowPrice)} ${item.lowTime ? `<span>(${escape(timeSince(item.lowTime))})
                                    </span>` : ``} </p></div> <div class="icon-text-group"><img src="/item-images/coins-lots.png" alt="high-price icon"> <p>${escape(item.highPrice)} ${item.highTime ? `<span>(${escape(timeSince(item.highTime))})
                                    </span>` : ``} </p></div> </div></div> <button class="svelte-3tf78z" data-svelte-h="svelte-omnqyf">Details</button> </article>`;
    })}</div> </details>`;
  })}`;
});
export {
  Page as default
};
