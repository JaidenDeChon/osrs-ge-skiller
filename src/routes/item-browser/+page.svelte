<script lang="ts">
	import type { PageData } from './$types';
    import type { GameItem, GameItemsBySkill } from '$lib/models/GameItem';
    import { goto } from '$app/navigation';
    import GameItemOverviewCard from '$lib/components/GameItemOverviewCard.svelte';

    export let data: PageData
    export let selectedSkill = 'crafting';
    $: gameItemsBySkill = data.gameItemsBySkill;
    $: categoriesForSelectedSkill = gameItemsBySkill
        .find((skill: GameItemsBySkill) => skill.skillName === selectedSkill)?.categories ?? [];
</script>

<hgroup>
    <h1>Item browser</h1>
    <h2>Here we will see a gallery allowing us to browse items.</h2>
</hgroup>

<select
    id="skill-selector-dropdown"
    bind:value={selectedSkill}
>
    {#each gameItemsBySkill as skill}
        <option>{ skill.skillName }</option>
    {/each}
</select>

{#each categoriesForSelectedSkill as category }
    <details>
        <summary>{ category.categoryName }</summary>

        <div class="gallery">
            {#each category.items as item }
                <GameItemOverviewCard gameItem="{item}" />
            {/each}
        </div>
    </details>
{/each}

<style>
    #skill-selector-dropdown {
        margin-bottom: 6rem;
    }

    .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }

    @media (min-width: 900px) {
        :global(.gallery > *) {
            width: calc(50% - 1em) !important;
        }
    }
</style>
