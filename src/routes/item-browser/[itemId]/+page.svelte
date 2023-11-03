<script lang="ts">
    import type { PageData } from '../$types';
    import type { GameItem } from '$lib/models/GameItem';
    import GameItemNested from '$lib/components/GameItemNested.svelte';

    export let data: PageData;
    $: itemDetails = (data as any).itemDetails as GameItem;
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
<div id="individual-item-page__tree-container"></div>

<table role="grid">
    <tbody>
        <tr>
            <th scope="row">Cost in materials</th>
            <td>999,999</td>
        </tr>
        <tr>
            <th scope="row">Profit after materials</th>
            <td>1,000 - 2,000</td>
        </tr>
        <tr>
            <th scope="row">Experience gained</th>
            <td>Crafting - 750</td>
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
        margin-bottom: 6rem;
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
</style>
