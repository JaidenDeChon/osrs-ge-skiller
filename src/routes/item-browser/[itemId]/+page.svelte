<script lang="ts">

	import { onNavigate } from '$app/navigation';
    import type { PageData } from '../$types';
    import type { GameItem } from '$lib/models/GameItem';
    import { materialCostLowStore, materialCostHighStore } from '$lib/stores/materialCostStore';
    import { timeSince } from '$lib/helpers/timeSince';
    import GameItemIngredientsTree from '$lib/components/GameItemIngredientsTree.svelte';
    import GameItemCard from '$lib/components/GameItemCard.svelte';
    import ImageWithTextPill from '$lib/components/ImageWithTextPill.svelte';

    export let data: PageData;
    $: itemDetails = (data as any).itemDetails as GameItem;

    onNavigate(() => {
        materialCostLowStore.set(0);
        materialCostHighStore.set(0);
    });

</script>

<!-- Title and image -->
<div class="flex items-center p-4 sm:p-10">
    <div class="rounded-full w-24 min-w-24 max-w-24 h-24 min-h-24 max-h-24 p-3 variant-soft-primary flex place-content-center">
        <img
            class="w-full h-auto object-contain"
            src="/item-images/{itemDetails.image}"
            alt="{itemDetails.name}"
        >
    </div>
    <div class="flex flex-col ml-4">
        <strong class="text-lg">{itemDetails.name}</strong>
        <p>{itemDetails.examineText}</p>
    </div>
</div>

<div class="card mb-6 variant-glass-surface rounded-md mx-10 border-solid border border-primary-900 shadow-xl">
    <GameItemIngredientsTree gameItem={itemDetails} />
</div>

<div class="table-container p-4 sm:p-10">
    <table class="table variant-glass-primary">
        <thead>
            <tr class="bg-primary-600">
                <th scope="col"></th>
                <th scope="colgroup">Low</th>
                <th scope="colgroup">High</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">GE Value</th>
                <td>{itemDetails.lowPrice}</td>
                <td>{itemDetails.highPrice}</td>
            </tr>
            <tr>
                <th scope="row">Material cost</th>
                <td>{Math.ceil($materialCostLowStore)}</td>
                <td>{Math.ceil($materialCostHighStore)}</td>
            </tr>
            <tr>
                <th scope="row">Profit after materials</th>
                <td>{itemDetails.lowPrice ? Math.ceil(itemDetails.lowPrice - $materialCostLowStore) : 'Insufficient data'}</td>
                <td>{itemDetails.highPrice ? Math.ceil(itemDetails.highPrice - $materialCostHighStore) : 'Insufficient data'}</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="px-4 mb-10 sm:px-10">
    <GameItemCard
        gameItem={itemDetails}
        enableBlur="{false}"
        enableTree
        showMaterialCostCheckbox
        isParent
    >
        <div slot="body">

            <h4 class="h4">Grand Exchange prices</h4>
            <div class="flex justify-evenly my-4">
                <ImageWithTextPill
                    src="/item-images/coins-few.png"
                    alt="just a few coins"
                    title="Low"
                    subtitle="{itemDetails.highPrice} GP"
                    subtitleAside={ itemDetails.lowTime ? `(${timeSince(itemDetails.lowTime, true)})` : '' }
                />
                <ImageWithTextPill
                    src="/item-images/coins-lots.png"
                    alt="lots of coins"
                    title="High"
                    subtitle="{itemDetails.highPrice} GP"
                    subtitleAside={ itemDetails.highTime ? `(${timeSince(itemDetails.highTime, true)})` : '' }
                />
            </div>
        </div>
    </GameItemCard>
</div>
