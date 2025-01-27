<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { filterItemsStore } from '$lib/stores/filterItemBrowserByPlayerLevelsStore';
	import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
	import SiteHero from '$lib/components/global/SiteHero.svelte';
	import ItemListControlBar from '$lib/components/global/ItemListControlBar.svelte';
	import SuperNewGameItemCard from '$lib/components/common/SuperNewGameItemCard.svelte';

	export let data: PageData;

	$: skillsToDisplay = $filterItemsStore.filterItemsBySkills.length
		? $filterItemsStore.filterItemsBySkills
		: Object.values(InGameSkillNamesEnum);

	// View transition-related functionality
	const duration = 300;
	const delay = duration + 100;
	const y = 10;

	const transitionIn = { easing: cubicOut, y, duration };
	const transitionOut = { easing: cubicIn, y: -y, duration };

	function getCategoriesOfSkill(skillName: InGameSkillNamesEnum) {
		return data.gameItemsBySkill.find(category => category.skillName === skillName)?.categories ?? [];
	}
</script>

<SiteHero />

<ItemListControlBar />

<div class="flex flex-col px-8 max-w-6xl mx-auto">
	<!-- For each skill that should be displayed... -->
	{#each skillsToDisplay as skill}

		<!-- Display an H2 and an accordion containing the categories within that skill. -->
		<h3 class="h3 capitalize mt-8 text-surface">{skill}</h3>
		<Accordion class="mt-4 bg-surface-50 p-6 rounded-md dark:variant-ghost-primary">

			<!-- For each category in this skill... -->
			{#each getCategoriesOfSkill(skill) as category}

				<!-- Add an accordion item for the category. -->
				<AccordionItem class="bg-surface-200 border border-surface-800 rounded-md dark:variant-filled-surface">
					<svelte:fragment slot="lead">
						<div class="accordion-lead-icon my-2 h-12 w-12 min-h-12 min-w-12 flex items-center justify-center bg-surface-50 dark:bg-transparent rounded-full dark:rounded-md">
							<img
								class="accordion-lead-icon__img w-6"
								src="item-images/{category.items[0].image}"
								alt="small thumbnail image depicting {category.items[0].name}"
							/>
						</div>
					</svelte:fragment>
					<svelte:fragment slot="summary"><p>{category.categoryName}</p></svelte:fragment>
					<svelte:fragment slot="content">
						<div
							in:fly={ { ...transitionIn, delay } }
							out:fly={ transitionOut }
							class="p-4 mb-4 gap-4 grid grid-cols-1 lg:grid-cols-2"
							style="align-items: start"
						>
							{#each category.items as item}
								<a href="item/{item.id}">
									<SuperNewGameItemCard {item} enableHoverEffect />
								</a>
							{/each}
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	{/each}
</div>

<style>
	.accordion-lead-icon {
		filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.1));
	}

	:global(:root.dark) .accordion-lead-icon {
		background-image: url("/other-images/inventory-texture.png");
	}

	:global(:root.dark) .accordion-lead-icon img {
		filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.6));
	}
</style>
