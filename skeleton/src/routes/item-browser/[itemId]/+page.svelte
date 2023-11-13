<script lang="ts">

	import { onNavigate } from '$app/navigation';
    import type { PageData } from '../$types';
    import type { GameItem } from '$lib/models/GameItem';
    import { materialCostLowStore, materialCostHighStore } from '$lib/stores/materialCostStore';
    import GameItemIngredientsTree from '$lib/components/GameItemIngredientsTree.svelte';
    import GameItemNested from '$lib/components/GameItemNested.svelte';

    export let data: PageData;
    $: itemDetails = (data as any).itemDetails as GameItem;

    onNavigate(() => {
        materialCostLowStore.set(0);
        materialCostHighStore.set(0);
    });

</script>

<!-- Title and image -->
<div class="flex items-center p-4 sm:p-10">
    <div class="rounded-full w-24 h-24 p-3 variant-soft-primary flex place-content-center">
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

<div class="card mb-6 variant-glass-surface rounded-none sm:rounded-md sm:mx-10">
    <GameItemIngredientsTree gameItem={itemDetails} />
</div>

<div class="table-container p-4 sm:p-10">
    <table class="table">
        <thead>
            <tr>
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

<div class="px-4 sm:px-10">
    <GameItemNested
        gameItem={ itemDetails }
        isParent={ true }
    />
</div>
