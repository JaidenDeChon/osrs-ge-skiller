<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<hgroup>
    <h1>Item browser</h1>
    <h2>Here we will see a gallery allowing us to browse items.</h2>
</hgroup>

<h3>Crafting</h3>

<details>
    <summary>Leather</summary>
    <div class="grid">
        {#each data.leatherItemsArray as item}
            <article class="item-browser-grid__item">
    
                <!-- Header with image, item name, item examine -->
                <header>
                    <img
                        src="/item-images/{item.imageName}"
                        alt="image of item: {item.itemData?.name}"
                    >
                    <hgroup>
                        <h5>{item.itemData?.name}</h5>
                        <h6>{item.itemData?.examine}</h6>
                    </hgroup>
                </header>
    
                <!-- Body -->
                <p>
                    <img src="/item-images/coins-few.png" alt="coins" />
                    Low Price: {item.itemData?.lowPrice}gp
                </p>
                <p>
                    <img src="/item-images/coins-lots.png" alt="coins" />
                    High Price: {item.itemData?.highPrice}gp
                </p>
            </article>
        {/each}
    </div>
</details>

<details>
    <summary>Snakeskin</summary>
    <div class="grid">
        {#each data.snakeskinItemsArray as item}
            <article class="item-browser-grid__item">
    
                <!-- Header with image, item name, item examine -->
                <header>
                    <img
                        src="/item-images/{item.imageName}"
                        alt="image of item: {item.itemData?.name}"
                    >
                    <hgroup>
                        <h5>{item.itemData?.name}</h5>
                        <h6>{item.itemData?.examine}</h6>
                    </hgroup>
                </header>
    
                <!-- Body -->
                <p>
                    <img src="/item-images/coins-few.png" alt="coins" />
                    Low Price: {item.itemData?.lowPrice}gp
                </p>
                <p>
                    <img src="/item-images/coins-lots.png" alt="coins" />
                    High Price: {item.itemData?.highPrice}gp
                </p>
            </article>
        {/each}
    </div>
</details>

<style>
    article {
        display: inline-block;
        margin-top: 0;
        margin-bottom: 0;
    }

    article header {
        display: flex;
        flex-direction: column;
        gap: var(--block-spacing-horizontal);
        align-items: flex-start;
    }

    article header hgroup {
        margin-bottom: 0;
    }

    article header img {
        height: 5rem;
        object-fit: fill;
    }

    article p img {
        margin-right: 1rem;
    }

    article p:last-child {
        margin-bottom: 0;
    }

    .grid {
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        row-gap: 1rem;
        column-gap: 1rem;
    }
</style>
