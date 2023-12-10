<script lang="ts">
    import { modeCurrent } from '@skeletonlabs/skeleton';
    import type { GameItem } from '$lib/models/GameItem';
    import GameItemDataAccordion from './GameItemDataAccordion.svelte';
    import ImageWithTextPill from './ImageWithTextPill.svelte';

    export let item: GameItem;
    export let amount: number = -1;
    export let linkToIngredients = false;
    export let enableTransparency = true;
    export let useSingleColumnImageTextPills = false;

    const cardClasses = `${ enableTransparency ? 'variant-glass-primary' : 'variant-filled-surface' } card border border-solid border-primary-700 rounded-md`;
</script>

<div class="{cardClasses} { $modeCurrent ? 'bg-surface-50' : '' }">
    <!-- Header -->
    <div class="p-6 flex gap-6">
        <div class="flex items-center justify-center w-16 h-16 p-3 rounded-full variant-ghost-primary">
            <img
                class="object-contain w-full h-full"
                src="/item-images/{item.image}"
                alt={item.name}
            >
        </div>
        <div class="flex flex-col gap-2">
            <h3 class="h3 pb-0 { $modeCurrent ? 'text-primary-900' : 'text-primary-300' }">
                {item.name}
                {#if amount !== -1}<span class="text-sm opacity-75">({amount})</span>{/if}
            </h3>
            <span class="text-sm { $modeCurrent ? 'text-primary-700' : 'text-primary-100' }">{item.examineText}</span>
        </div>
    </div>

    <!-- Body -->
    <div class="p-6 flex flex-col gap-4 rounded-b-md variant-filled-surface {$modeCurrent ? 'bg-surface-50' : ''}">

        <div class="flex flex-col gap-4 xl:flex-row { useSingleColumnImageTextPills ? '!flex-col' : '' }">
            <ImageWithTextPill
                src="item-images/coins-lots.png"
                alt="a pile of coins"
            >
                <div class="flex flex-col mr-3">
                    <p class="font-bold">Current Price</p>
                    <p>
                        {item.highPrice} <span class="text-xs opacity-75">(high)</span>
                        {item.lowPrice} <span class="text-xs opacity-75">(low)</span>
                    </p>
                </div>
            </ImageWithTextPill>

            <ImageWithTextPill
                src="spell-images/high-level-alchemy.png"
                alt="high alchemcy spell icon"
            >
                <div class="flex flex-col mr-3">
                    <p class="font-bold">Alchemy</p>
                    <p>
                        {item.highAlch} <span class="text-xs opacity-75">(high)</span>
                        {item.lowAlch} <span class="text-xs opacity-75">(low)</span>
                    </p>
                </div>
            </ImageWithTextPill>
        </div>

        <GameItemDataAccordion
            {item}
            showXpStats
            showTree
            treeColumnCount="{1}"
        />

        {#if linkToIngredients}
            <a
                href="/item/{item.id}"
                class="btn variant-filled-primary w-full"
            >
                Details
            </a>
        {/if}
    </div>
</div>
