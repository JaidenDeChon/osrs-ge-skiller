import { g as getItemById } from "../../../../chunks/gameItemCache.js";
const GET = async ({ url }) => {
  const itemId = url.searchParams.get("itemId");
  if (!itemId)
    return new Response(JSON.stringify({ "bitching": "No item ID was given" }));
  const foundItem = await getItemById(itemId);
  return new Response(JSON.stringify(foundItem));
};
export {
  GET
};
