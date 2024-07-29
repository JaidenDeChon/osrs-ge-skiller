<script lang="ts">
	import type { GameItem } from '$lib/models/GameItem';

    export let item: GameItem;
    export let enableHoverEffect = false;
</script>

<div class="card { enableHoverEffect ? 'card-hover' : '' } p-4 bg-surface-50 dark:variant-ghost-primary">
    <div class="flex gap-4 items-start">
        <div class="game-item-card__thumbnail-container h-16 w-16 max-w-16 max-h-16 flex items-center justify-center rounded-full">
            <img
                src="/item-images/{item.image}"
                alt="small thumbnail image depicting {item.name}"
                class="game-item-card__thumbnail w-8 max-w-8 max-h-8 object-contain"
            />
        </div>
        <div class="flex flex-col justify-evenly">
            <p>{item.name}</p>
            <p class="text-sm italic mb-2">{item.examineText}</p>
            <div class="flex gap-9">

                <div class="image-with-text flex items-center gap-2">
                    <img
                        src="/item-images/coins-lots.png"
                        alt="A pile of coins"
                        class="w-3"
                    >
                    <p class="text-xs">{item.highPrice}</p>
                </div>

                <div class="image-with-text flex justify-start items-center gap-2 w-full">
                    <img
                        src="/spell-images/high-level-alchemy.png"
                        alt="High alchemy spell icon"
                        class="w-3"
                    >
                    <p class="text-xs">{item.highAlch}</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .game-item-card__thumbnail {
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.6));
    }
</style>
