<script lang="ts">
    import { get } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    import { SlideToggle, RadioGroup, RadioItem, type PopupSettings, popup } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { ModalNamesEnum } from '$lib/enums/ModalNamesEnum';
	import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
    import { filterItemsStore } from '$lib/stores/filterItemBrowserByPlayerLevelsStore';

    const modalStore = getModalStore();
    const dispatch = createEventDispatcher();

    export let viewMode: 0 | 1;

    const popupClick: PopupSettings = {
        event: 'click',
        target: 'popupClick',
        placement: 'bottom'
    };

    const skillsList = Object.values(InGameSkillNamesEnum);

    function toggleSelectedSkill(skillName: InGameSkillNamesEnum) {
        const currentSelectedSkills = get(filterItemsStore).filterItemsBySkills;
        const indexOfSelectedSkill = currentSelectedSkills.indexOf(skillName);

        // If it's already in there, take it out. Otherwise, add it.
        if (indexOfSelectedSkill >= 0) currentSelectedSkills.splice(indexOfSelectedSkill, 1);
        else currentSelectedSkills.push(skillName);

        filterItemsStore.update(current => ({
            ...current,
            filterItemsBySkills: currentSelectedSkills
        }));
    }

    function fireStatsModal() {
		modalStore.trigger({
			type: 'component',
			component: ModalNamesEnum.PLAYER_SKILLS_MODAL
		});
	}
</script>

<div class="min-h-min w-full max-w-6xl flex flex-col justify-between items-center lg:gap-4 lg:mt-4 bg-surface-50 dark:bg-surface-800 lg:bg-transparent dark:lg:bg-transparent lg:flex-row border border-x-0 border-t-0 border-b-1 border-surface-300 dark:border-surface-400 lg:border-0 lg:mx-auto">
    <!-- Controls whether to exclude items not relevant to the user's skills -->
    <div class="h-12 w-full flex items-center justify-start gap-4 px-8 border border-x-0 border-t-0 border-b-1 border-surface-300 dark:border-surface-400 lg:border-0 lg:w-auto">
        <SlideToggle
            background="bg-surface-500 dark:bg-surface-400"
            active="bg-primary-500"
            name="filter-by-user-skills-toggle"
            label="Filter by skill levels"
            size="sm"
            bind:checked={$filterItemsStore.filterItemsByPlayerLevels}
        >
            Filter by my skill levels
        </SlideToggle>
        <button
            class="badge-icon variant-filled-primary cursor-pointer"
            use:popup={popupClick}
        >
            <i class="fa-solid fa-question"></i>
        </button>
    </div>

    <!-- Categories -->
    <div class="h-12 w-full px-8 flex items-center gap-4 lg:w-auto">
        {#each skillsList as skill}
            <button
                class="chip { $filterItemsStore.filterItemsBySkills.includes(skill) ? 'variant-filled-primary' : 'variant-soft-primary' }"
                on:click={() => { toggleSelectedSkill(skill); }}
            >
                {#if $filterItemsStore.filterItemsBySkills.includes(skill)}
                    <span>
                        <i class="fa-solid fa-check"></i>
                    </span>
                {/if}
                <span class="capitalize">{skill}</span>
            </button>
        {/each}
    </div>
</div>

<div class="w-full max-w-6xl px-8 py-3 flex flex-col lg:items-end gap-4 bg-surface-50 dark:bg-surface-800 lg:bg-transparent dark:lg:bg-transparent lg:flex-row border border-x-0 border-t-0 border-b-1 border-surface-300 dark:border-surface-400 lg:border-0 lg:mx-auto">
    <label class="label">
        <span>Sort by</span>
        <select disabled class="select variant-ghost-primary">
            <option value="category">Category</option>
        </select>
    </label>

    <label class="label">
        <span>Order</span>
        <select disabled class="select variant-ghost-primary">
            <option value="descending">Highest first</option>
            <option value="ascending">Lowest first</option>
        </select>
    </label>

    <div class="flex flex-col gap-1 mr-auto lg:mr-0 lg:ml-auto">
        <span class="span">View</span>
        <div>
            <RadioGroup
                display="flex"
                background="bg-primary-100 dark:bg-primary-900"
                border="border border-3 border-primary-500"
                hover="hover:variant-glass-primary"
                active="variant-filled-primary"
            >
                <RadioItem
                    bind:group={viewMode}
                    name="justify"
                    value={0}
                    on:change={(value) => dispatch('layout-change', 0)}
                >
                    <i class="fa-solid fa-table-cells-large"></i>
                </RadioItem>
                
                <RadioItem
                    bind:group={viewMode}
                    name="justify"
                    value={1}
                    on:change={(value) => dispatch('layout-change', 1)}
                >
                    <i class="fa-solid fa-bars"></i>
                </RadioItem>
            </RadioGroup>
        </div>
    </div>
</div>

<!-- Popup element for "Filter by my skill levels" help button -->
<div class="card p-4 variant-filled-secondary max-w-sm shadow-lg" data-popup="popupClick">
    <p><button class="anchor text-secondary-100" on:click={fireStatsModal}>Enter your skill levels</button> to only see items you can create!</p>
    <div class="arrow variant-filled-secondary" />
</div>
