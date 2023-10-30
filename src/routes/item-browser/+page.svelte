<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;

    export function timeSince(unixTimestamp: number) {
        // Get current time in seconds.
        const currentTime = Math.floor(Date.now() / 1000);
        // Calculate the difference in seconds.
        const timeDifference = currentTime - unixTimestamp;

        if (timeDifference < 60) {
            return timeDifference === 1 ? "1 second ago" : `${timeDifference} seconds ago`;
        } else if (timeDifference < 3600) { // 60 * 60 = 3600 seconds in an hour
            const minutes = Math.floor(timeDifference / 60);
            return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
        } else if (timeDifference < 86400) { // 60 * 60 * 24 = 86400 seconds in a day
            const hours = Math.floor(timeDifference / 3600);
            return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return days === 1 ? "1 day ago" : `${days} days ago`;
        }
    }

</script>

<hgroup>
    <h1>Item browser</h1>
    <h2>Here we will see a gallery allowing us to browse items.</h2>
</hgroup>

<h3>Crafting</h3>

{#each data.creatableItems as collection }
<details>
    <summary>{ collection.name }</summary>

    <div class="gallery">
        {#each collection.items as item }
            <article class="card">

                <header>
                    <div class="card__image-container">
                        <img
                            src="/item-images/{ item.image }"
                            alt="{ item.name }"
                            class="card__image"
                        >
                    </div>
                    <hgroup class="card__title-container">
                        <h5>{ item.name }</h5>
                        <h6> { item.examineText }</h6>
                    </hgroup>
                </header>

                <div class="card__content">

                    <div class="card__content-column">
                        <div class="card__icon-text-group">
                            <img src="/spell-images/low-level-alchemy.png" alt="high-level alchemy">
                            <p>{ item.lowAlch }</p>
                        </div>
    
                        <div class="card__icon-text-group">
                            <img src="/spell-images/high-level-alchemy.png" alt="high-level alchemy">
                            <p>{ item.highAlch }</p>
                        </div>
                    </div>

                    <div class="card__content-column">
                        <div class="card__icon-text-group">
                            <img src="/item-images/coins-few.png" alt="low-price icon">
                            <p>
                                { item.lowPrice }
                                {#if item.lowTime}
                                    <span>
                                        ({ timeSince(item.lowTime) })
                                    </span>
                                {/if}
                            </p>
                        </div>
        
                        <div class="card__icon-text-group">
                            <img src="/item-images/coins-lots.png" alt="high-price icon">
                            <p>
                                { item.highPrice }
                                {#if item.highTime}
                                    <span>
                                        ({ timeSince(item.highTime) })
                                    </span>
                                {/if}
                            </p>
                        </div>
                    </div>
                </div>

                <button>Details</button>

            </article>
        {/each}
    </div>
</details>
{/each}

<style>
    .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }

    .gallery article.card {
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
    }

    article.card header {
        display: flex;
        gap: 1em;
    }

    .card__image-container {
        height: 3.3em !important;
        width: 3.3em !important;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--card-background-color);
        border-radius: 50%;
    }

    .card__image {
        height: 2em;
        width: 2em;
        object-fit: scale-down;
    }

    article.card {
        padding-bottom: var(--block-spacing-horizontal);
    }

    article.card header hgroup {
        margin: 0;
    }

    article.card .card__content {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: var(--block-spacing-vertical);
    }

    article.card .card__content-column {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    article.card .card__icon-text-group {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1em;
    }

    article.card .card__icon-text-group img {
        width: 1.6em;
    }

    article.card .card__icon-text-group p {
        margin-bottom: 0;
    }

    article.card .card__icon-text-group p span {
        color: var(--muted-color);
    }

    article.card button {
        margin-bottom: 0;
    }

    @media (min-width: 1200px) {
        .gallery article.card {
            width: calc(50% - 1rem)
        }
    }
</style>
