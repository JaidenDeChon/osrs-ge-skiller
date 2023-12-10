<script lang="ts">
    import { onMount } from 'svelte';
	import type { GameItem } from '$lib/models/GameItem';
	import { RecursiveTreeView, RadioGroup, RadioItem, type TreeViewNode } from '@skeletonlabs/skeleton';
    import GameItemIngredientsTree from './GameItemIngredientsTree.svelte';

    export let item: GameItem;

    let allIngredients: Map<string, { item: GameItem, amount: number }> = new Map();
    let nodes: TreeViewNode[] = [];
    let checkedNodes: string[] = [];
    let indeterminateNodes: string[] = [];
    let viewMode = 0 as 0 | 1; // 0 for tree, 1 for hierarchy

    $: materialCostHigh = Math.ceil(calculateHighMaterialCost(checkedNodes));
    $: materialCostLow = Math.ceil(calculateLowMaterialCost(checkedNodes));

    $: highNetProfit = item.lowPrice ? Math.ceil(item.lowPrice - materialCostLow) : 'Insufficient data';
    $: lowNetProfit = item.highPrice ? Math.ceil(item.highPrice - materialCostHigh) : 'Insufficient data';

    /**
     * Transforms the given array of recursive GameItem objects into an array of recursive TreeViewNode objects.
     */
    function mapGameItemsToTreeViewNode(): TreeViewNode[] {
        function mapItem(itemToMap: GameItem): TreeViewNode {
            let children: TreeViewNode[] = [];

            if (itemToMap.creationSpecs && itemToMap.creationSpecs.ingredients)
                children = itemToMap.creationSpecs.ingredients.map(ingredient => mapItem(ingredient.item));

            return {
                id: itemToMap.id,
                children,
                content: itemToMap.name,
                value: itemToMap,
                lead: `<img src="/item-images/${itemToMap.image}" class="h-6 w-6" />`
            };
        }

        // Change this to start mapping from the children of the root item
        return item.creationSpecs?.ingredients.map(ingredient => mapItem(ingredient.item)) || [];
    }

    /**
     * Flattens the nested GameItems into a mapping of item IDs to their amounts and GameItem objects.
     * Variable `allIngredients` is modified in-place.
     */
    export function populateAllIngredientsArray(): void {
        function processItem(item: GameItem, amount: number): void {
            if (allIngredients.has(item.id)) {
                allIngredients.get(item.id)!.amount += amount;
            } else {
                allIngredients.set(item.id, { item: item, amount: amount });
            }

            if (item.creationSpecs && item.creationSpecs.ingredients) {
                item.creationSpecs.ingredients.forEach(ingredient => {
                    processItem(ingredient.item, ingredient.amount);
                });
            }
        }

        // Start processing from the ingredients of the root item
        if (item.creationSpecs && item.creationSpecs.ingredients) {
            item.creationSpecs.ingredients.forEach(ingredient => {
                processItem(ingredient.item, ingredient.amount);
            });
        }
    }


    /**
     * Calculates the total high or low value of all items currently selected for counting.
     * @param ids string[] The array of GameItem IDs that are currently selected for counting.
     * @param priceKey ('highPrice' | 'lowPrice') The property of the gameItem from which to pull price. Should be
     *     either `'highPrice'` or `'lowPrice'`.
     */
    function calculateTotalValue(ids: string[], priceKey: 'highPrice' | 'lowPrice'): number {
        let totalValue = 0;
        const countedItems = new Set<string>();

        ids.forEach(id => {
            const ingredient = allIngredients.get(id);
            if (ingredient && ingredient.item[priceKey]) {
                // Check if the item is not consumed or not counted yet
                if (
                    ingredient
                        .item
                        .creationSpecs
                        ?.ingredients.some(ing =>
                            !ing.consumedDuringCreation && ing.item.id === id) && !countedItems.has(id)
                ) {
                    totalValue += (ingredient.item[priceKey] as number);
                    countedItems.add(id);
                } else if (countedItems.has(id)) {
                    // Do nothing, as the item's value is already counted
                } else {
                    // Add the value normally for consumed items
                    totalValue += (ingredient.item[priceKey]) as number * ingredient.amount;
                }
            }
        });

        return totalValue;
    }

    /**
     * Finds the high end of the material cost given the currently-counted items.
     * @param ids string[] The array of GameItem IDs that are currently selected for counting.
     */
    function calculateHighMaterialCost(ids: string[]): number {
        return calculateTotalValue(ids, 'highPrice');
    }

    /**
     * Finds the low end of the material cost given the currently-counted items.
     * @param ids string[] The array of GameItem IDs that are currently selected for counting.
     */
    function calculateLowMaterialCost(ids: string[]): number {
        return calculateTotalValue(ids, 'lowPrice');
    }

    /**
     * "Selects" all of the game items so they're all active.
     */
     function selectAllGameItems() {
        allIngredients.forEach(ingredient => {
            if (ingredient.item.id !== item.id) {
                checkedNodes.push(ingredient.item.id);
            }
        });
    }

    function updateChecked(data: any): void {
        const id = (data.detail.id);
        if (checkedNodes.includes(id)) checkedNodes = checkedNodes.filter(itemId => itemId !== id);
        else checkedNodes = [...checkedNodes, id];
    }

    onMount(() => {
        // Get a version of the GameItem tree compatible with Skeleton tree component
        nodes.push(...mapGameItemsToTreeViewNode());
        // Get a flat array of all ingredients involved
        populateAllIngredientsArray();
        // Include all items initially
        selectAllGameItems();
    });
</script>

<div class="card variant-ghost-primary p-4 flex flex-col gap-4 lg:flex-row">

    <!-- Tree type switcher (visual vs. nested) -->
    <div class="flex flex-col gap-4 lg:w-1/2">

        <div class="ml-auto lg:ml-0 relative z-10">
            <RadioGroup
                background="bg-primary-100 dark:bg-primary-900"
                border="border border-3 border-primary-500"
                hover="hover:variant-glass-primary"
                active="variant-filled-primary"
            >
                <RadioItem bind:group={viewMode} name="view" value={0}>
                    <i class="fa-solid fa-network-wired"></i>
                </RadioItem>
                <RadioItem bind:group={viewMode} name="view" value={1}>
                    <i class="fa-solid fa-bars"></i>
                </RadioItem>
            </RadioGroup>
        </div>

        <!-- Not using {#if} so that D3 doesn't lose sync -->
        <div class={viewMode === 0 ? 'visible' : 'hidden'}>
            <!-- D3 Tree -->
                <GameItemIngredientsTree
                {item}
                {checkedNodes}
                on:itemClicked={updateChecked}
            />
        </div>

        {#if viewMode === 1}
            <!-- Skeleton relational tree -->
            <RecursiveTreeView
                class="variant-ghost-primary p-4"
                selection
                multiple
                {nodes}
                bind:checkedNodes={checkedNodes}
                bind:indeterminateNodes={indeterminateNodes}
            />
        {/if}
    </div>

    <!-- Table -->
    <table class="table variant-ghost-primary lg:w-1/2">
        <thead>
            <tr class="variant-filled-primary">
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
                <td>{materialCostLow}</td>
                <td>{materialCostHigh}</td>
            </tr>
            <tr>
                <th scope="row">Profit after materials</th>
                <td>{highNetProfit}</td>
                <td>{lowNetProfit}</td>
            </tr>
        </tbody>
    </table>
</div>
