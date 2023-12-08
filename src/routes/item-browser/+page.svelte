<script lang="ts">
    import type { PageData } from './$types';
    import { Accordion, AccordionItem, RadioGroup, RadioItem, SlideToggle, getModalStore } from '@skeletonlabs/skeleton';
    import type { GameItem, GameItemsByCategory } from '$lib/models/GameItem';
    import { ModalNamesEnum } from '$lib/enums/ModalNamesEnum';
    import GameItemCard from '$lib/components/GameItemCard.svelte';
	import GameItemCardNew from '$lib/components/GameItemCardNew.svelte';
    import { playerSkillsStore, type PlayerSkillsStoreType } from '$lib/stores/playerSkillsStore';
	import { filterItemsStore } from '$lib/stores/filterItemBrowserByPlayerLevelsStore';

    const modalStore = getModalStore();

    export let data: PageData;
    const noSelectedSkillValue = 'all skills';
    let selectedSkill = noSelectedSkillValue;
    let pageView = 1; // 0 for compact, 1 for expanded

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

    function getCategoriesOfSelectedSkill(nameOfSelectedSkill: string): GameItemsByCategory[] {
        return data.gameItemsBySkill
            .find(skill =>
                nameOfSelectedSkill === noSelectedSkillValue || skill.skillName === nameOfSelectedSkill)?.categories ?? [];
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

    $: filteredCategories = getCategoriesOfSelectedSkill(selectedSkill);
    $: categoriesOfSelectedSkill = applyFilterIfRequired(filteredCategories, $playerSkillsStore, $filterItemsStore);
	$: totalVisibleItems = categoriesOfSelectedSkill.reduce((total, category) => total + category.items.length, 0);

    function openPlayerSkillsModal() {
        modalStore.trigger({
            type: 'component',
            component: ModalNamesEnum.PLAYER_SKILLS_MODAL
        });
    }
</script>

<ol class="breadcrumb-nonresponsive m-4 mb-6">
	<li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Item Browser</li>
</ol>

<div class="mx-4 my-4 mb-6">
	<h1 class="h1 mb-4">Item browser</h1>
	<p>
		Here, you can browse the craftable items in the game. Use the "filters" section below to narrow down your
		search, or control whether to filter out items that can't be made with your levels.
	</p>
</div>

<div class="p-4 mb-6">
	<Accordion class="variant-ghost-primary">
		<AccordionItem class="">
			<svelte:fragment slot="summary">Filters</svelte:fragment>
			<svelte:fragment slot="content">
	
				<!-- Filter by skills dropdown -->
				<label class="label mb-4">
					<span>Show which skill?</span>
					<select
						class="select variant-soft-secondary"
						id="skill-selector-dropdown"
						bind:value={selectedSkill}
					>
						{#each data.gameItemsBySkill as skill}
							<option>{ noSelectedSkillValue }</option>
							<option>{ skill.skillName }</option>
						{/each}
					</select>
				</label>
	
				<!-- Filter by my skill levels toggle -->
				<SlideToggle
					bind:checked={$filterItemsStore}
					size="sm"
					name="slider-for-filter-by-level"
					background="bg-surface-400"
					active="bg-secondary-500"
				>
					Filter by my levels
				</SlideToggle>
				<br>
				<button
					class="btn btn-sm variant-soft-secondary"
					on:click={openPlayerSkillsModal}
				>
					Set my levels
				</button>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

<div class="flex justify-between m-4 mb-6">

	<p>Showing {totalVisibleItems} items</p>

	<RadioGroup class="variant-glass-secondary">
		<RadioItem
			bind:group={pageView}
			name="justify"
			value={0}
			class="{ pageView === 0 ? 'variant-filled-secondary' : 'variant-glass-secondary' }"
		>
			<i class="fa-solid fa-list-ul"></i>
		</RadioItem>
		<RadioItem
			bind:group={pageView}
			name="justify"
			value={1}
			class="{ pageView === 1 ? 'variant-filled-secondary' : 'variant-glass-secondary' }"
		>
			<i class="fa-solid fa-border-all"></i>
		</RadioItem>
	</RadioGroup>
</div>

{#each categoriesOfSelectedSkill as category }
	{#if category.items.length}
		<span class="h3 ml-4">{category.categoryName}</span>

		<div
			class="p-4 gap-4 grid grid-cols-1 2xl:grid-cols-2"
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
