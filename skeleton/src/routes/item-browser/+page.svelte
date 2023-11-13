<script lang="ts">
	import type { PageData } from './$types';
	import type { GameItemsBySkill } from '$lib/models/GameItem';
	import GameItemOverviewCard from '$lib/components/GameItemOverviewCard.svelte';

	export let data: PageData;
	export let selectedSkill = 'all';

	$: gameItemsBySkill = data.gameItemsBySkill;
	$: categoriesForSelectedSkill = gameItemsBySkill
		.find((skill: GameItemsBySkill) => selectedSkill === 'all' ? true : skill.skillName === selectedSkill)?.categories ?? [];
</script>

<div class="mx-10 my-4">
	<h1 class="h1">Item browser</h1>
</div>

<label class="label m-10">
	<span>Select a skill</span>
	<select
		class="select variant-soft-primary"
		id="skill-selector-dropdown"
		bind:value={selectedSkill}
	>
		{#each gameItemsBySkill as skill}
			<option>all</option>
			<option>{ skill.skillName }</option>
		{/each}
	</select>
</label>

{#each categoriesForSelectedSkill as category }

	<h3 class="h3 ml-10">{category.categoryName}</h3>

	<div class="p-10 grid gap-6 grid-cols-1 lg:grid-cols-2">
		{#each category.items as item }
			<GameItemOverviewCard
				classes="flex-1"
				gameItem="{item}"
			/>
		{/each}
	</div>
{/each}
