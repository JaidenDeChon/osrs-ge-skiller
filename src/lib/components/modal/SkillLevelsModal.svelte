<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import { playerSkillsStore } from '$lib/stores/playerSkillsStore';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let parent: SvelteComponent;

    let craftingLevel: number = $playerSkillsStore.crafting ?? 0;
    let fletchingLevel: number = $playerSkillsStore.fletching ?? 0;
    let smithingLevel: number = $playerSkillsStore.smithing ?? 0;

	const modalStore = getModalStore();

	function save(): void {
        $playerSkillsStore.crafting = craftingLevel;
        $playerSkillsStore.fletching = fletchingLevel;
        $playerSkillsStore.smithing = smithingLevel;

		modalStore.close();
	}

</script>

<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4 border border-primary-500">

    <header class="text-2xl font-bold">Skill levels</header>
    <article>Enter your skill levels to filter out irrelevant items. Or don't. Whatever.</article>

    <form class="modal-form p-4 space-y-4 rounded-container-token">
        <!-- Crafting level -->
        <label class="label">
            <span>Crafting</span>
            <input
                class="input"
                type="number"
                inputmode="decimal"
                bind:value={craftingLevel}
            />
        </label>

        <!-- Fletching level -->
        <label class="label">
            <span>Fletching</span>
            <input
                class="input"
                type="number"
                inputmode="decimal"
                bind:value={fletchingLevel}
            />
        </label>
    
        <!-- Smithing level -->
        <label class="label">
            <span>Smithing</span>
            <input
                class="input"
                type="number"
                inputmode="decimal"
                bind:value={smithingLevel}
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
