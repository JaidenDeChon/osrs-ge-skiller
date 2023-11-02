<script lang="ts">
    import type { GameItem } from '$lib/models/GameItem';
    import { timeSince } from '$lib/helpers/timeSince';

    export let gameItem: GameItem;
    export let isParent = false;
    export let amount: number;
    let includeInProductionCost = true;
</script>

<div class="game-item-nested">
    <!-- Title and image -->
    <div class="game-item-nested__title">
        <img
            src="/item-images/{ gameItem.image }"
            alt="{ gameItem.name }"
        >
        <p>{ gameItem.name }</p>
        {#if amount}
            <p class="muted">(x { amount })</p>
        {/if}
    </div>

    <!-- GE prices -->
    <div class="game-item-nested__stats">
        <div class="icon-text-group">
            <img src="/item-images/coins-few.png" alt="Just a few coins.">
            <p>
                { gameItem.lowPrice }
                {#if gameItem.lowTime}
                    <span>
                        ({ timeSince(gameItem.lowTime, true) })
                    </span>
                {/if}
            </p>
        </div>
    
        <div class="icon-text-group">
            <img src="/item-images/coins-lots.png" alt="Lots of coins!">
            <p>
                { gameItem.highPrice }
                {#if gameItem.highTime}
                    <span>
                        ({ timeSince(gameItem.highTime, true) })
                    </span>
                {/if}
            </p>
        </div>
    </div>

    <!-- High/low alch (parent item only) -->
    {#if isParent}
        <div class="game-item-nested__stats">
            <div class="icon-text-group">
                <img src="/spell-images/low-level-alchemy.png" alt="Low level alchemy">
                <p>
                    { gameItem.highAlch }
                </p>
            </div>
        
            <div class="icon-text-group">
                <img src="/spell-images/high-level-alchemy.png" alt="High level alchemy">
                <p>
                    { gameItem.lowAlch }
                </p>
            </div>
        </div>
    {/if}

    <!-- Checkbox for including in total (!isParent only) -->
    {#if !isParent}
        <label>
            <input
                type="checkbox"
                bind:checked={includeInProductionCost}
            >
            Include in production cost
        </label>
    {/if}


    {#if gameItem.creationSpecs && gameItem.creationSpecs.ingredients}

        <details class="game-item-nested__ingredients">
            <summary>Ingredients</summary>

            {#each gameItem.creationSpecs.ingredients as ingredient}
                <svelte:self
                    gameItem={ingredient.item}
                    amount={ingredient.amount}
                />
            {/each}
        </details>
    {/if}
</div>

<style>
    .game-item-nested {
        border: 0.1em solid;
        padding: 1em;
        margin-top: 1rem;
        border-radius: var(--border-radius);
    }

    .game-item-nested__title {
        display: flex;
        align-items: center;
        gap: 1em;
        margin-bottom: 1em;
    }

    .game-item-nested__title img {
        height: 2em;
        width: 2em;
        object-fit: contain;
    }

    .game-item-nested__title p {
        margin-bottom: 0;
    }

    .game-item-nested__stats {
        margin-bottom: 1em;
        display: flex;
        justify-content: space-around;
    }

    .icon-text-group {
        min-width: 40%;
    }

    .icon-text-group span {
        font-size: 0.75em;
    }

    .game-item-nested__ingredients {
        margin-top: 1rem;
    }

    .game-item-nested details {
        margin-top: 1.5em;
        margin-bottom: 0;
    }

    .muted {
        color: var(--muted-color);
    }

    @media (prefers-color-scheme: dark) {
        .game-item-nested {
            border-width: 0.2em !important;
            border-color: var(--card-sectionning-background-color);
        }
    }

    @media (prefers-color-scheme: light) {
        .game-item-nested {
            border-color: rgb(237, 240, 243);
            box-shadow: var(--card-box-shadow);
        }

        :global(.game-item-nested__ingredients .game-item-nested) {
            border-width: 0.12em !important;
            box-shadow: none !important;
        }
    }
</style>
