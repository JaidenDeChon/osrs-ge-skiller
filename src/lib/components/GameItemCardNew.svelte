<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import type { GameItem } from '$lib/models/GameItem';

    export let item: GameItem;
    let selectedBodyView: number = 0;
</script>

<div class="variant-glass-primary border border-solid border-primary-700 shadow-xl rounded-md">
    <!-- Header -->
    <div class="p-6 flex gap-6">
        <div class="flex items-center justify-center w-16 h-16 p-3 rounded-full variant-ghost-primary">
            <img
                class="object-contain w-full h-full"
                src="/item-images/{item.image}"
                alt={item.name}
            >
        </div>
        <div class="flex flex-col gap-2">
            <h3 class="h3 pb-0">{item.name}</h3>
            <span class="text-sm">{item.examineText}</span>
        </div>
    </div>

    <!-- Body -->
    <div class="p-6 rounded-b-md bg-surface-100 dark:bg-surface-600">
        <RadioGroup
            display="flex"
            background="bg-primary-100 dark:bg-primary-900"
            border="border border-3 border-primary-500"
            hover="hover:variant-glass-primary"
            active="variant-filled-primary"
        >
            <RadioItem bind:group={selectedBodyView} name="justify" value={0}>Value</RadioItem>
            <RadioItem bind:group={selectedBodyView} name="justify" value={1}>Skill Data</RadioItem>
            <RadioItem bind:group={selectedBodyView} name="justify" value={2}>Ingredients</RadioItem>
        </RadioGroup>
    </div>
</div>