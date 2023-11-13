<script lang="ts">
    import { onMount } from 'svelte';
    import type { GameItem } from '$lib/models/GameItem';
    import { timeSince } from '$lib/helpers/timeSince';
    import { materialCostLowStore, materialCostHighStore } from '$lib/stores/materialCostStore';
    import ImageWithText from './ImageWithText.svelte';

    // Props.

    export let gameItem: GameItem;
    export let isParent = false;
    export let amount: number = 1;
    export let classes = '';

    // Variables.

    $: countsTowardValue = true;
    $: highPriceAsIngredient = amount * (gameItem.highPrice ?? 0);
    $: lowPriceAsIngredient = amount * (gameItem.lowPrice ?? 0);

    // Functions.

    function handleToggle (event: Event): void {
        (event.target as HTMLInputElement).checked
            ? incrementMaterialCost()
            : decrementMaterialCost();
    }

    function incrementMaterialCost (): void {
        materialCostHighStore.update((value: number) => value += highPriceAsIngredient);
        materialCostLowStore.update((value: number) => value += lowPriceAsIngredient);
    }

    function decrementMaterialCost (): void {
        materialCostHighStore.update((value: number) => value -= highPriceAsIngredient);
        materialCostLowStore.update((value: number) => value -= lowPriceAsIngredient);
    }

    onMount(() => {
        if (!isParent) incrementMaterialCost();
    });
</script>

<div class="game-item-nested card variant-ghost-surface p-6 my-3">
    <!-- Title and image -->
    <div class="flex items-center">
        <div class="rounded-full w-16 min-w-16 max-w-16 h-16 min-h-16 max-h-16 p-3 variant-soft-tertiary flex place-content-center">
            <img
                class="w-full h-auto object-contain"
                src="/item-images/{gameItem.image}"
                alt="{gameItem.name}"
            >
        </div>
        <div class="flex flex-col ml-4">
            <strong class="text-lg">{gameItem.name}</strong>
            <p>{gameItem.examineText}</p>
        </div>
    </div>

    <div class="flex place-content-evenly">
        <!-- GE prices -->
        <div class="flex {isParent ? 'flex-col' : 'place-content-evenly w-full'} gap-4 my-6">
            <ImageWithText
                src="/item-images/coins-few.png"
                alt="Just a few coins."
            >
                <p>
                    { gameItem.lowPrice }
                    {#if gameItem.lowTime}
                        <span>
                            ({ timeSince(gameItem.lowTime, true) })
                        </span>
                    {/if}
                </p>
            </ImageWithText>

            <ImageWithText
                src="/item-images/coins-lots.png"
                alt="Lots of coins!"
            >
                <p>
                    { gameItem.highPrice }
                    {#if gameItem.highTime}
                        <span>
                            ({ timeSince(gameItem.highTime, true) })
                        </span>
                    {/if}
                </p>
            </ImageWithText>
        </div>

        <!-- High/low alch (parent item only) -->
        {#if isParent}
            <div class="flex flex-col gap-4 my-6">
                <ImageWithText
                    src="/spell-images/low-level-alchemy.png"
                    alt="Low level alchemy"
                >
                    <p>{ gameItem.highAlch }</p>
                </ImageWithText>

                <ImageWithText
                    src="/spell-images/high-level-alchemy.png"
                    alt="High level alchemy"
                >
                    <p>{ gameItem.lowAlch }</p>
                </ImageWithText>
            </div>
        {/if}
    </div>

    <!-- Checkbox for including in total (!isParent only) -->
    <!-- on:change={(event) => dispatch('toggled', gameItem.id)} -->
    {#if !isParent}
        <label>
            <input
                type="checkbox"
                bind:checked={countsTowardValue}
                on:change={(event) => handleToggle(event)}
            >
            Include in materials cost
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
