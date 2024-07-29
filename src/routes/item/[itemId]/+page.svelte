<script lang="ts">

    import type { PageData } from '../../$types';
    import type { GameItem } from '$lib/models/GameItem';
    import GameItemDataAccordion from '$lib/components/common/GameItemDataAccordion.svelte';
    import MaterialCostTree from '$lib/components/item-ingredients/MaterialCostTree.svelte';
    import _ from 'lodash';

    export let data: PageData;
    $: item = (data as any).itemDetails as GameItem;

</script>

<div class="px-8 py-4 max-w-6xl mx-auto">
    <!-- Title and image -->
    <div class="flex items-center mb-6">
        <div class="rounded-full w-24 min-w-24 max-w-24 h-24 min-h-24 max-h-24 p-4 variant-soft-primary flex place-content-center">
            <img
                class="w-full object-contain"
                src="/item-images/{item.image}"
                alt="{item.name}"
            >
        </div>
        <div class="flex flex-col ml-4">
            <strong class="text-lg">{item.name}</strong>
            <p>{item.examineText}</p>
        </div>
    </div>

    <div class="mb-12 flex gap-1">
        <!-- Wiki link -->
        <a
            href="https://oldschool.runescape.wiki/w/{_.snakeCase(item.name)}"
            target="_blank"
        >
            <div class="chip variant-filled-primary">
                <img
                    class="rounded-full h-4 w-4 mr-2"
                    src="/other-images/osrs-wiki.png"
                    alt="OSRS Wiki icon"
                >
                Wiki
            </div>
        </a>

        <!-- GE Tracker link -->
        <a
            href="https://www.ge-tracker.com/item/{item.id}"
            target="_blank"
        >
            <div class="chip variant-filled-primary">
                <img
                    class="rounded-full h-4 w-4 mr-2"
                    src="/other-images/ge-tracker.png"
                    alt="OSRS Wiki icon"
                >
                GE Tracker
            </div>
        </a>
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

    <div class="mt-6">
        <MaterialCostTree {item}/>
    </div>
</div>
