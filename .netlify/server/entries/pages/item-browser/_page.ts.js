const load = async ({ fetch }) => {
  const response = await fetch("/api/game-items-by-skill");
  const gameItemsBySkill = await response.json();
  return { gameItemsBySkill };
};
export {
  load
};
