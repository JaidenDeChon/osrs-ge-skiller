<script lang="ts">
    import type { GameItem } from '$lib/models/GameItem';
    import GameItemDataAccordion from './GameItemDataAccordion.svelte';
    import Card from './Card.svelte';

    const slots = $$slots;

    export let item: GameItem;
    export let compact = false;
    export let showXpStats = false;
    export let showGeData = false;
    export let showAlchemy = false;
    export let showTree = false;
    export let enableBlur = true;
    export let amount = 1;
    export let isParent = false;
    export let linkToIngredients = false;

</script>

<a
    href="{ compact ? `/item/${item.id}` : '#' }"
    class="{ compact ? 'cursor-pointer' : 'cursor-default' }"
>
    <Card
        {enableBlur}
        {compact}
        enableHover="{compact}"
    >
        <!-- Header -->
        <div
            slot="header"
            class="flex gap-6"
        >
            <img
                class="w-16 h-16 object-contain"
                src="/item-images/{item.image}"
                alt="{item.name}"
            >
            <div class="flex flex-col gap-2">
                <h4 class="h3 pb-0">
                    {item.name}
                    {#if !isParent}
                        <span class="text-sm">({amount})</span>
                    {/if}
                </h4>
                <span>{item.examineText}</span>
            </div>
        </div>

        <!-- Body -->
        <GameItemDataAccordion
            slot="body"
            {item}
            {showXpStats}
            {showGeData}
            {showAlchemy}
            {showTree}
            treeColumnCount={1}
        />

        <!-- Footer -->
        <svelte:fragment slot="footer">
            {#if linkToIngredients}
                <div class="p-4">
                    <a
                        href="/items/{item.id}"
                        class="btn variant-filled-primary w-full"
                    >
                        Details
                    </a>
                </div>
            {/if}
        </svelte:fragment>
    </Card>
</a>
