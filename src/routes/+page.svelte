<script lang="ts">
	import type { PageData } from './$types';
	import type { GameItem } from '$lib/models/GameItem';
	import type { GameItemsByCategory } from '$lib/models/GameItem';
	import { playerSkillsStore, type PlayerSkillsStoreType } from '$lib/stores/playerSkillsStore';
	import { filterItemsStore } from '$lib/stores/filterItemBrowserByPlayerLevelsStore';
	import SiteHero from '$lib/components/SiteHero.svelte';
	import ItemListControlBar from '$lib/components/ItemListControlBar.svelte';
	import GameItemCardNew from '$lib/components/GameItemCardNew.svelte';

	export let data: PageData;
	const noSelectedSkillValue = 'all skills';
    let selectedSkill = noSelectedSkillValue;

	function shouldFilterPlayerSkills(playerSkills: PlayerSkillsStoreType): boolean {
        return Object.values(playerSkills).some(skillLevel => skillLevel > 0);
    }

	function filterGameItemsByPlayerSkills(items: GameItem[], playerSkills: PlayerSkillsStoreType): GameItem[] {
		return items.filter(item => {
			if (!item.creationSpecs || !item.creationSpecs.requiredSkills) {
				return true; // Include items with no required skills
			}

			return item.creationSpecs.requiredSkills.every(requiredSkill => {
				const playerSkillLevel = playerSkills[requiredSkill.skillName];

				// If player's skill level is undefined (skill not known) or meets/exceeds the requirement, include the item
				// Undefined player skill levels should not filter out the item
				return playerSkillLevel === undefined || playerSkillLevel >= requiredSkill.skillLevel;
			});
		});
	}

	function applyFilterIfRequired(categories: GameItemsByCategory[], playerSkills: PlayerSkillsStoreType, filterActive: boolean) {
        if (filterActive && shouldFilterPlayerSkills(playerSkills)) {
            return categories.map(category => ({
                ...category,
                items: filterGameItemsByPlayerSkills(category.items, playerSkills)
            }));
        }
        return categories;
    }

	function getCategoriesOfSelectedSkill(nameOfSelectedSkill: string): GameItemsByCategory[] {
        return data.gameItemsBySkill
            .find(skill =>
                nameOfSelectedSkill === noSelectedSkillValue || skill.skillName === nameOfSelectedSkill)?.categories ?? [];
    }

	$: filteredCategories = getCategoriesOfSelectedSkill(selectedSkill);
	$: categoriesOfSelectedSkill = applyFilterIfRequired(filteredCategories, $playerSkillsStore, $filterItemsStore);
</script>

<SiteHero />
<ItemListControlBar />
 
<div class="flex flex-col p-4 max-w-6xl mx-auto">
	{#each categoriesOfSelectedSkill as category }
		{#if category.items.length}
			<span class="h3 ml-4">{category.categoryName}</span>

			<div
				class="p-4 mb-4 gap-4 grid grid-cols-1 lg:grid-cols-2"
				style="align-items: start"
			>
				{#each category.items as item }
					<div>
						<!-- <GameItemCard
							item={item}
							compact={pageView === 0}
							linkToIngredients={true}
							showTree
							showXpStats
							showGeData
							showAlchemy
							isParent
						/> -->
						<GameItemCardNew {item} />
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>
