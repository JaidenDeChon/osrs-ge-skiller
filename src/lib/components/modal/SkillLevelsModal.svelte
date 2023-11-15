<script lang="ts">
	import { goto } from '$app/navigation';
    import type { SvelteComponent } from 'svelte';

	// Stores
    import { playerSkillsStore } from '$lib/stores/playerSkillsStore';
	import { getModalStore } from '@skeletonlabs/skeleton';
    import { filterItemsStore } from '$lib/stores/filterItemBrowserByPlayerLevelsStore';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// We've created a custom submit function to pass the response and close the modal.
	function save(): void {
        if ($modalStore[0].meta.navigateToItemBrowserUponClose) {
            filterItemsStore.set(true);
            goto('/item-browser/');
        }
		modalStore.close();
	}

</script>

<!-- @component This example creates a simple form modal. -->

<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4 border border-primary-500">

    <header class="text-2xl font-bold">Skill levels</header>
    <article>Enter your skill levels to filter out irrelevant items. Or don't. Whatever.</article>

    <!-- Enable for debugging: -->
    <form class="modal-form p-4 space-y-4 rounded-container-token">
        <!-- Crafting level -->
        <label class="label">
            <span>Crafting</span>
            <input
                class="input"
                type="number"
                inputmode="decimal"
                bind:value={$playerSkillsStore.crafting}
            />
        </label>

        <!-- Fletching level -->
        <label class="label">
            <span>Fletching</span>
            <input
                class="input"
                type="number"
                inputmode="decimal"
                bind:value={$playerSkillsStore.fletching}
            />
        </label>
    
        <!-- Smithing level -->
        <label class="label">
            <span>Smithing</span>
            <input
                class="input"
                type="number"
                inputmode="decimal"
                bind:value={$playerSkillsStore.smithing}
            />
        </label>
    </form>

    <footer class="modal-footer {parent.regionFooter}">
        <button
            class="btn variant-filled-secondary"
            on:click={parent.onClose}
        >
            Cancel
        </button>

        <button
            class="btn variant-filled-primary"
            on:click={save}
        >
            Save
        </button>
    </footer>
</div>
