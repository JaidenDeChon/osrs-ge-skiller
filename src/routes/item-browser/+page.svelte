<script lang="ts">
	import type { PageData } from './$types';
    import type { GameItem, GameItemsBySkill } from '$lib/models/GameItem';
    import { goto } from '$app/navigation';
    // import { timeSince } from '$lib/helpers/timeSince';
    import GameItemOverviewCard from '$lib/components/GameItemOverviewCard.svelte';

    export let data: PageData
    export let selectedSkill = 'crafting';
    $: gameItemsBySkill = data.gameItemsBySkill;
    $: categoriesForSelectedSkill = gameItemsBySkill
        .find((skill: GameItemsBySkill) => skill.skillName === selectedSkill)?.categories ?? [];

    function navigateToItemBrowser(item: GameItem) {
        goto(`/item-browser/${item.id}`);
    }

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
            <!-- <article class="card">

                <header>
                    <div class="card__image-container">
                        <img
                            src="/item-images/{ item.image }"
                            alt="{ item.name }"
                            class="card__image"
                        >
                    </div>
                    <hgroup class="card__title-container">
                        <h5>{ item.name }</h5>
                        <h6> { item.examineText }</h6>
                    </hgroup>
                </header>

                <div class="card__content">

                    <div class="card__content-column">
                        <div class="icon-text-group">
                            <img src="/spell-images/low-level-alchemy.png" alt="high-level alchemy">
                            <p>
                                <span>Low alch - </span>
                                { item.lowAlch }
                            </p>
                        </div>
    
                        <div class="icon-text-group">
                            <img src="/spell-images/high-level-alchemy.png" alt="high-level alchemy">
                            <p>
                                <span>High alch - </span>
                                { item.highAlch }
                            </p>
                        </div>
                    </div>

                    <div class="card__content-column">
                        <div class="icon-text-group">
                            <img src="/item-images/coins-few.png" alt="low-price icon">
                            <p>
                                { item.lowPrice }
                                {#if item.lowTime}
                                    <span>
                                        ({ timeSince(item.lowTime) })
                                    </span>
                                {/if}
                            </p>
                        </div>
        
                        <div class="icon-text-group">
                            <img src="/item-images/coins-lots.png" alt="high-price icon">
                            <p>
                                { item.highPrice }
                                {#if item.highTime}
                                    <span>
                                        ({ timeSince(item.highTime) })
                                    </span>
                                {/if}
                            </p>
                        </div>
                    </div>
                </div>

                <button on:click={ () => navigateToItemBrowser(item) }>Details</button>

            </article> -->
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

    .gallery article.card {
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
    }

    article.card header {
        display: flex;
        gap: 1em;
    }

    .card__image-container {
        height: 3.3em !important;
        width: 3.3em !important;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--card-background-color);
        border-radius: 50%;
    }

    .card__image {
        height: 2em;
        width: 2em;
        object-fit: scale-down;
    }

    article.card {
        padding-bottom: var(--block-spacing-horizontal);
    }

    article.card header hgroup {
        margin: 0;
    }

    article.card .card__content {
        display: flex;
        gap: 1em;
        justify-content: space-evenly;
        margin-bottom: var(--block-spacing-vertical);
    }

    article.card .card__content-column {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    :global(.icon-text-group) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1em;
    }

    :global(.icon-text-group img) {
        width: 1.6em;
    }

    :global(.icon-text-group p) {
        margin-bottom: 0;
    }

    :global(.icon-text-group p span) {
        color: var(--muted-color);
    }

    article.card button {
        margin-bottom: 0;
    }

    @media (min-width: 1200px) {
        .gallery article.card {
            width: calc(50% - 0.5rem)
        }

        article.card .card__content {
            flex-direction: column;
        }
    }
</style>
