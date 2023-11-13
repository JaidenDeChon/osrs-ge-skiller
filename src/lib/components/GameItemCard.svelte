<script lang="ts">
    import { onMount } from 'svelte';
    import { timeSince } from '$lib/helpers/timeSince';
    import { materialCostHighStore, materialCostLowStore } from '$lib/stores/materialCostStore';
    import type { GameItem } from '$lib/models/GameItem';
    import ImageWithTextPill from './ImageWithTextPill.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    const slots = $$slots;

    export let gameItem: GameItem;
    export let isParent = true;
    export let enableTree = false;
    export let enableBlur = true;
    export let amount = 1;
    export let showMaterialCostCheckbox = false;

    $: ingredients = gameItem.creationSpecs?.ingredients ?? [];
    $: countsTowardValue = true;
    $: highPriceAsIngredient = amount * (gameItem.highPrice ?? 0);
    $: lowPriceAsIngredient = amount * (gameItem.lowPrice ?? 0);


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

<!-- Overall container for applying blurry border -->
<div class="card {enableBlur ? 'variant-glass-surface' : 'variant-soft-primary'} border-solid border border-primary-900 shadow-xl">

    <!-- The card itself, transparent so other elements can be too -->
    <div class="bg-transparent">

        <!-- Header -->
        <header class="card-header p-6">
            <div class="flex gap-6">
                <img
                    class="w-16 h-16 object-contain"
                    src="/item-images/{gameItem.image}"
                    alt="{gameItem.name}"
                >
                <div class="flex flex-col gap-2">
                    <h4 class="h3 pb-0">{gameItem.name}</h4>
                    <span>{gameItem.examineText}</span>
                </div>
            </div>
        </header>

        <!-- Card content container -->
        <div class="p-4 bg-surface-50 text-surface-900 dark:bg-surface-900 dark:text-surface-50 {!slots.footer ? 'rounded-b-sm' : ''}">
            <!-- Body slot -->
            {#if slots.body}
                <slot name="body"/>
            {/if}

            <!-- Checkbox for including in total (!isParent only) -->
            {#if !isParent && showMaterialCostCheckbox}
                <label>
                    <input
                        type="checkbox"
                        bind:checked={countsTowardValue}
                        on:change={(event) => handleToggle(event)}
                    >
                    Include in materials cost
                </label>
            {/if}

            <!-- Enable tree if prop is true and there are ingredients -->
            {#if enableTree && ingredients.length}
            <h4 class="h4">Ingredients</h4>
            <div class="p-6 flex flex-col gap-6">
                    <Accordion>
                        {#each ingredients as ingredient}
                            <AccordionItem>
                                <!-- Item image -->
                                <svelte:fragment slot="lead">
                                    <img
                                        class="w-8 h-8"
                                        src="/item-images/{ingredient.item.image}"
                                        alt="{ingredient.item.name}"
                                    >
                                </svelte:fragment>

                                <!-- Item name -->
                                <svelte:fragment slot="summary">
                                    <p>{ingredient.item.name}</p>
                                </svelte:fragment>
                                <svelte:fragment slot="content">
                                    <svelte:self
                                        gameItem={ingredient.item}
                                        enableTree
                                        enableBlur={false}
                                        isParent={false}
                                        amount={ingredient.amount}
                                        {showMaterialCostCheckbox}
                                    >
                                        <div slot="body">
                                            <div class="flex justify-evenly my-4">
                                                <ImageWithTextPill
                                                    src="/item-images/coins-few.png"
                                                    alt="just a few coins"
                                                    title="Low"
                                                    subtitle="{ingredient.item.highPrice} GP"
                                                    subtitleAside={ ingredient.item.lowTime ? `(${timeSince(ingredient.item.lowTime, true)})` : '' }
                                                />
                                                <ImageWithTextPill
                                                    src="/item-images/coins-lots.png"
                                                    alt="lots of coins"
                                                    title="High"
                                                    subtitle="{ingredient.item.highPrice} GP"
                                                    subtitleAside={ ingredient.item.highTime ? `(${timeSince(ingredient.item.highTime, true)})` : '' }
                                                />
                                            </div>
                                        </div>
                                    </svelte:self>
                                </svelte:fragment>
                            </AccordionItem>
                        {/each}
                    </Accordion>
                </div>
            {/if}

            <!-- Footer slot -->
            {#if slots.footer}
                <footer class="card-footer p-0">
                    <slot name="footer"/>
                </footer>
            {/if}
        </div>
    </div>
</div>
