<script lang="ts">

	import { onNavigate } from '$app/navigation';
    import type { PageData } from '../$types';
    import type { GameItem } from '$lib/models/GameItem';
    import { materialCostLowStore, materialCostHighStore } from '$lib/stores/materialCostStore';
    import GameItemIngredientsTree from '$lib/components/GameItemIngredientsTree.svelte';
    import GameItemDataAccordion from '$lib/components/GameItemDataAccordion.svelte';
    import MaterialCostTree from '$lib/components/MaterialCostTree.svelte';

    export let data: PageData;
    $: item = (data as any).itemDetails as GameItem;

    onNavigate(() => {
        materialCostLowStore.set(0);
        materialCostHighStore.set(0);
    });

</script>

<!-- Title and image -->
<div class="flex items-center p-4">
    <div class="rounded-full w-24 min-w-24 max-w-24 h-24 min-h-24 max-h-24 p-3 variant-soft-primary flex place-content-center">
        <img
            class="w-full h-auto object-contain"
            src="/item-images/{item.image}"
            alt="{item.name}"
        >
    </div>
    <div class="flex flex-col ml-4">
        <strong class="text-lg">{item.name}</strong>
        <p>{item.examineText}</p>
    </div>
</div>

<GameItemDataAccordion
    {item}
    spacing="space-y-1"
    showGeData
    showXpStats
    showAlchemy
    showTree
    openGeData
/>

<div class="p-4 sm:p-10">
    <MaterialCostTree {item}/>
</div>

<!-- <div class="table-container p-4 sm:p-10">
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
                <td>{item.lowPrice}</td>
                <td>{item.highPrice}</td>
            </tr>
            <tr>
                <th scope="row">Material cost</th>
                <td>{Math.ceil($materialCostLowStore)}</td>
                <td>{Math.ceil($materialCostHighStore)}</td>
            </tr>
            <tr>
                <th scope="row">Profit after materials</th>
                <td>{item.lowPrice ? Math.ceil(item.lowPrice - $materialCostLowStore) : 'Insufficient data'}</td>
                <td>{item.highPrice ? Math.ceil(item.highPrice - $materialCostHighStore) : 'Insufficient data'}</td>
            </tr>
        </tbody>
    </table>
</div> -->

<div class="px-4 mb-10 sm:px-10">
    <!-- Tree component with relational checkboxes will go here -->
</div>
