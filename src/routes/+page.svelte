<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { getToastStore, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { filterItemsStore } from '$lib/stores/filterItemBrowserByPlayerLevelsStore';
	import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
	import SiteHero from '$lib/components/global/SiteHero.svelte';
	import ItemListControlBar from '$lib/components/global/ItemListControlBar.svelte';
	import GameItemCardNew from '$lib/components/common/GameItemCard.svelte';
	import GameItemCardCompact from '$lib/components/common/GameItemCardCompact.svelte';

	const toastStore = getToastStore();

	export let data: PageData;
	let viewMode = 1 as 0 | 1; // 0 for expanded, 1 for compact

	$: skillsToDisplay = $filterItemsStore.filterItemsBySkills.length
		? $filterItemsStore.filterItemsBySkills
		: Object.values(InGameSkillNamesEnum);

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

	function getCategoriesOfSkill(skillName: InGameSkillNamesEnum) {
		return data.gameItemsBySkill.find(category => category.skillName === skillName)?.categories ?? [];
	}
</script>

<SiteHero />

<ItemListControlBar
	{viewMode}
	on:layout-change={changeLayout}
/>

<div class="flex flex-col px-8 max-w-6xl mx-auto">
	<!-- For each skill that should be displayed... -->
	{#each skillsToDisplay as skill}

		<!-- Display an H2 and an accordion containing the categories within that skill. -->
		<h2 class="h2 capitalize mt-8">{skill}</h2>
		<Accordion class="mt-4">

			<!-- For each category in this skill... -->
			{#each getCategoriesOfSkill(skill) as category}

				<!-- Add an accordion item for the category. -->
				<AccordionItem open>
					<svelte:fragment slot="summary"><h3 class="h3">{category.categoryName}</h3></svelte:fragment>
					<svelte:fragment slot="content">
						{#key viewMode}
							<div
								in:fly={ { ...transitionIn, delay } }
								out:fly={ transitionOut }
								class="p-4 mb-4 gap-4 grid grid-cols-1 lg:grid-cols-2"
								style="align-items: start"
							>
								{#each category.items as item}
									{#if viewMode === 0}
										<GameItemCardNew
											{item}
											linkToIngredients
											showAccordion
										/>
									{/if}

									{#if viewMode === 1}
										<a href="/item/{item.id}">
											<GameItemCardCompact {item} />
										</a>
									{/if}
								{/each}
							</div>
						{/key}
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	{/each}
</div>
