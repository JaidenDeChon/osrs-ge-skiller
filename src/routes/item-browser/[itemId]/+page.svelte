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

<div class="individual-item-page__header">
    <div class="individual-item-page__header-image-container">
        <img
            src="/item-images/{ itemDetails.image }"
            alt={ itemDetails.name }
        >
    </div>
    <hgroup>
        <h1>{ itemDetails.name }</h1>
        <h2>{ itemDetails.examineText }</h2>
    </hgroup>
</div>

<!-- This is where the tree will go -->
<div class="individual-item-page__tree-container">
    <GameItemIngredientsTree gameItem={itemDetails} />
</div>

<table role="grid">
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

<GameItemNested
    gameItem={ itemDetails }
    isParent={ true }
/>

<style>
    .individual-item-page__header {
        display: flex;
        gap: 1rem;
    }

    .individual-item-page__header-image-container {
        height: 6rem;
        width: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--card-sectionning-background-color);
        border-radius: 50%;
    }

    .individual-item-page__header img {
        width: 4.4rem;
        height: 4.4rem;
        object-fit: contain;
    }

    .individual-item-page__tree-container {
        margin: 2rem auto;
    }
</style>
