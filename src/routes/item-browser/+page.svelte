<script lang="ts">
	import type { PageData } from './$types';
	import type {
		GameItem,
		GameItemCreationSkillRequirement,
		GameItemCreationExperienceGranted,
		GameItemsBySkill
	} from '$lib/models/GameItem';
	import GameItemCard from '$lib/components/GameItemCard.svelte';
	import ImageWithTextPill from '$lib/components/ImageWithTextPill.svelte';
	import { timeSince } from '$lib/helpers/timeSince';

	export let data: PageData;
	export let selectedSkill = 'all';

	$: gameItemsBySkill = data.gameItemsBySkill;
	$: categoriesForSelectedSkill = gameItemsBySkill
		.find((skill: GameItemsBySkill) => selectedSkill === 'all' ? true : skill.skillName === selectedSkill)?.categories ?? [];
</script>

<div class="mx-4 my-4 mb-12">
	<h1 class="h1">Item browser</h1>
</div>

<label class="label m-4 mb-12">
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

	<h3 class="h3 ml-4">{category.categoryName}</h3>

	<div class="p-4 grid gap-6 grid-cols-1 2xl:grid-cols-2" style="align-items: start">
		{#each category.items as item }
			<GameItemCard
				item={item}
				showTree
				showXpStats
				showGeData
				showAlchemy
				isParent
			>
				<div slot="footer">
					<a
						href="/item-browser/{item.id}"
						class="btn variant-filled-primary w-full"
					>
						Details
					</a>
				</div>
			</GameItemCard>
		{/each}
	</div>
{/each}
