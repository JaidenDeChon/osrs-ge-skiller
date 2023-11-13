<script lang="ts">
	import type { PageData } from './$types';
	import type { GameItem, GameItemsBySkill } from '$lib/models/GameItem';
	import GameItemOverviewCard from '$lib/components/GameItemOverviewCard.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let selectedSkill = 'crafting';

	$: gameItemsBySkill = data.gameItemsBySkill;
	$: categoriesForSelectedSkill = gameItemsBySkill
		.find((skill: GameItemsBySkill) => skill.skillName === selectedSkill)?.categories ?? [];
</script>

<div class="container p-10 space-y-4">
	<h1 class="h1">Item browser</h1>
</div>

<label class="label p-10">
	<span>Select a skill</span>
	<select
		class="select"
		id="skill-selector-dropdown"
		bind:value={selectedSkill}
	>
		{#each gameItemsBySkill as skill}
			<option>{ skill.skillName }</option>
		{/each}
	</select>
</label>

{#each categoriesForSelectedSkill as category }
	<Accordion class="px-10">
		<AccordionItem>
			<!-- Accordion title -->
			<svelte:fragment slot="summary">
				<strong>{ category.categoryName }</strong>
			</svelte:fragment>

			<svelte:fragment slot="content">
				<div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
					{#each category.items as item }
						<GameItemOverviewCard
							classes="flex-1"
							gameItem="{item}"
						/>
					{/each}
				</div>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
{/each}
