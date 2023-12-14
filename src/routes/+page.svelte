<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { GameItem } from '$lib/models/GameItem';
	import type { GameItemsByCategory } from '$lib/models/GameItem';
	import { playerSkillsStore, type PlayerSkillsStoreType } from '$lib/stores/playerSkillsStore';
	import { filterItemsStore } from '$lib/stores/filterItemBrowserByPlayerLevelsStore';
	import SiteHero from '$lib/components/global/SiteHero.svelte';
	import ItemListControlBar from '$lib/components/global/ItemListControlBar.svelte';
	import GameItemCardNew from '$lib/components/common/GameItemCard.svelte';
	import GameItemCardCompact from '$lib/components/common/GameItemCardCompact.svelte';

	const toastStore = getToastStore();

	export let data: PageData;
	const noSelectedSkillValue = 'all skills';
    let selectedSkill = noSelectedSkillValue;
	let viewMode = 0 as 0 | 1; // 0 for expanded, 1 for compact

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

	// View transition-related functionality
	const duration = 300;
	const delay = duration + 100;
	const y = 10;

	const transitionIn = { easing: cubicOut, y, duration };
	const transitionOut = { easing: cubicIn, y: -y, duration };

	function changeLayout(eventDetail: any) {
		const mode = (eventDetail.detail as 1 | 0);
		// Show a loading toast so they know we're working on it.
		toastStore.trigger({
			autohide: true,
			timeout: 3500,
			hoverable: false,
			message: `Switched to ${mode === 0 ? 'detailed' : 'compact'} view.`,
			hideDismiss: true,
			classes: 'variant-filled-secondary shadow-lg'
		});
		viewMode = (eventDetail.detail as 1 | 0);
	}
</script>

<SiteHero />

<ItemListControlBar
	{viewMode}
	on:layout-change={changeLayout}
/>
 
<div class="flex flex-col p-4 max-w-6xl mx-auto">
	{#each categoriesOfSelectedSkill as category }
		{#if category.items.length}
			<span class="h3 ml-4">{category.categoryName}</span>

			{#key viewMode}
				<div
					in:fly={ { ...transitionIn, delay } }
					out:fly={ transitionOut }
					class="p-4 mb-4 gap-4 grid grid-cols-1 lg:grid-cols-2"
					style="align-items: start"
				>
					{#each category.items as item }
						<!-- Expanded view mode -->
						{#if viewMode === 0}
							<GameItemCardNew
								{item}
								linkToIngredients
								showAccordion
							/>
						{/if}
							
						<!-- Compact view mode -->
						{#if viewMode === 1}
							<a href="/item/{item.id}">
								<GameItemCardCompact {item} />
							</a>
						{/if}
					{/each}
				</div>
			{/key}
		{/if}
	{/each}
</div>
