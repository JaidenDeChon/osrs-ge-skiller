<script lang="ts">
    import { modeCurrent } from '@skeletonlabs/skeleton';
    import type { GameItem } from '$lib/models/GameItem';

    export let item: GameItem;
    export let enableTransparency = true;
    export let amount = -1;
    const cardClasses = `${ enableTransparency ? 'variant-glass-primary' : 'variant-filled-surface' } card card-hover border border-solid border-primary-700 rounded-md`;
</script>

<div class="{cardClasses}  { $modeCurrent ? 'bg-surface-50' : '' }">
    <div class="p-6 flex gap-6">
        <div class="flex items-center justify-center w-16 h-16 p-3 rounded-full variant-ghost-primary">
            <img
                class="object-contain w-full h-full"
                src="/item-images/{item.image}"
                alt={item.name}
            >
        </div>
        <div class="flex flex-col gap-2">
            <h3 class="h3 pb-0 { $modeCurrent ? 'text-primary-900' : 'text-primary-300' }">
                {item.name}
                {#if amount !== -1}<span class="text-sm opacity-75">({amount})</span>{/if}
            </h3>
            <span class="{ $modeCurrent ? 'text-primary-700' : 'text-primary-100' }">
                <img class="inline mr-1 h-4" src="item-images/coins-lots.png" alt="a pile of coins">
                <span class="text-xs mr-6">{item.lowPrice} - {item.highPrice}</span>
                <img class="inline mr-1 h-4" src="spell-images/low-level-alchemy.png" alt="low-level alchemy icon">
                <span class="text-xs">{item.lowAlch}, {item.highAlch}</span>
            </span>
        </div>
    </div>
</div>
