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

	function getLevelRequirements (item: GameItem): GameItemCreationSkillRequirement[] {
		return item.creationSpecs?.requiredSkills ?? [];
	}

	function getXpGranted (item: GameItem): GameItemCreationExperienceGranted[] {
		return item.creationSpecs?.experienceGranted ?? [];
	}
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

	<div class="p-10 grid gap-6 grid-cols-1 2xl:grid-cols-2" style="align-items: start">
		{#each category.items as item }
			<GameItemCard
				gameItem={item}
				isParent
				enableTree
			>
				<div slot="body">
					<h4 class="h4">XP requirements and rewards</h4>
					<div class="flex justify-evenly my-4">
						{#each getLevelRequirements(item) as requirement}
							<ImageWithTextPill
								src="/skill-images/{requirement.skillName}.png"
								alt="{requirement.skillName} skill icon"
								title="Skill requirement"
								subtitle="{requirement.skillLevel} {requirement.skillName}"
							/>
						{/each}

						{#each getXpGranted(item) as xpGranted}
						<ImageWithTextPill
							src="/skill-images/{xpGranted.skillName}.png"
							alt="{xpGranted.skillName} skill icon"
							title="XP granted"
							subtitle="1,000 XP"
						/>
						{/each}
					</div>

					<hr class="!border-t-3" />

					<h4 class="h4">Grand Exchange prices</h4>
					<div class="flex justify-evenly my-4">
						<ImageWithTextPill
							src="/item-images/coins-few.png"
							alt="just a few coins"
							title="Low"
							subtitle="{item.highPrice} GP"
							subtitleAside={ item.lowTime ? `(${timeSince(item.lowTime, true)})` : '' }
						/>
						<ImageWithTextPill
							src="/item-images/coins-lots.png"
							alt="lots of coins"
							title="High"
							subtitle="{item.highPrice} GP"
							subtitleAside={ item.highTime ? `(${timeSince(item.highTime, true)})` : '' }
						/>
					</div>

					<hr class="!border-t-3" />

					<h4 class="h4">Alchemy values</h4>
					<div class="flex justify-evenly my-4">
						<ImageWithTextPill
							src="/spell-images/low-level-alchemy.png"
							alt="low alchemy"
							title="Low alch"
							subtitle="{item.lowAlch} GP"
						/>
						<ImageWithTextPill
							src="/spell-images/high-level-alchemy.png"
							alt="high alchemy"
							title="High alch"
							subtitle="{item.highAlch} GP"
						/>
					</div>
				</div>
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
