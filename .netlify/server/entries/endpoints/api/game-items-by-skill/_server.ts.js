import { a as getItemsBySkill } from "../../../../chunks/gameItemCache.js";
const GET = async ({ url }) => {
  const skillName = url.searchParams.get("skillName");
  let itemsByCategory;
  itemsByCategory = skillName ? await getItemsBySkill(skillName) : await getItemsBySkill();
  return new Response(JSON.stringify(itemsByCategory));
};
export {
  GET
};
