const load = async ({ params, fetch }) => {
  const itemId = params.itemId;
  const searchParams = new URLSearchParams({ itemId });
  const response = await fetch("/api/game-item-by-id?" + searchParams.toString());
  const itemDetails = await response.json();
  return { itemDetails };
};
export {
  load
};
