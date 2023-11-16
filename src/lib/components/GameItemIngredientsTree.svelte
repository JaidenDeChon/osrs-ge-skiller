<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import type { GameItem } from '$lib/models/GameItem';

    const dispatch = createEventDispatcher();

    export let item: GameItem;
    export let checkedNodes: string[] = [];

    const treeHeight = 200;
    let treeWidth = 400;
    let mounted = false;

    $: updateTreeNodeStyles(checkedNodes);

    interface TreeData {
        name: string;
        itemData?: GameItem;
        children?: TreeData[];
    }

    onMount(() => {
        const screenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerHeight || 0);
        const tree = transformGameItemToD3(item);
        d3Setup(tree);
        mounted = true;
    });

    function handleNodeClick(payload: any) {
        const id = payload.data.itemData.id;
        // Don't emit clicked if it was the root item
        if (id === item.id) return;
        dispatch('itemClicked', { id });
    }

    function d3Setup(treeData: TreeData) {
        const root = d3.hierarchy(treeData as unknown);

        const clusterLayout = d3.cluster()
            .size([treeWidth, treeHeight])
            (root)

        const tree = d3.select('.game-item-ingredients-tree__tree g.nodes');

        const treeNodes = tree.selectAll('g.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .classed('node', true)
            .on('click', (event, d) => handleNodeClick(d));

        const nodeHeight = 60;
        const nodeWidth = 140;

        treeNodes.append('circle')
            .classed('the-node solid', true)
            .attr('cx', c => c.x)
            .attr('cy', c => c.y)
            .attr('r', () => 28)
            .attr('stroke', 'rgb(11, 140, 97)');

        // Apply 'parent' class to parent node
        treeNodes.each(function(d) {
            if (d.parent) return;
            d3.select(this).select('circle').classed('parent', true);
        });

        const imageDimensions = 33;
        treeNodes.append('image')
            .attr('xlink:href', d => `/item-images/${d.data.itemData.image}`) // Assuming d.data.image contains the path to the image file
            .attr('x', d => d.x - imageDimensions / 2)
            .attr('y', d => d.y - imageDimensions / 2)
            .style('width', `${imageDimensions}`)
            .style('height', `${imageDimensions}`);
        
        const treeLinks = d3.select('.game-item-ingredients-tree__tree g.links')
            .selectAll('path.link')
            .data(root.links())
            .enter()
            .append('path')
            .classed('link', true)
            .attr('d', d => {
                const link = d3.linkVertical()
                    .x(node => node.x)
                    .y(node => node.y);
                return link(d);
            })
            .attr('fill', 'none')
            .attr('stroke', 'rgb(11, 140, 97)');
    }

    function transformGameItemToD3(item: GameItem): TreeData {
        const name = item.name;
        const itemData = item;

        if (!item.creationSpecs || !item.creationSpecs.ingredients.length) {
            return { name, itemData };
        }

        const children = item.creationSpecs.ingredients.map(ingredient =>
            transformGameItemToD3(ingredient.item)
        );

        return { name, children, itemData };
    }

    function updateTreeNodeStyles(nodeIds: string[]) {
        if (!mounted) return;
        const treeNodes = d3.selectAll('.game-item-ingredients-tree__tree g.node');

        // Apply styles or classes based on whether the node is checked
        treeNodes.each(function(d) {
            if (!d.parent) return;

            d3.select(this).select('circle')
                .classed('not-counted', !nodeIds.includes(d.data.itemData.id));
        });
    }

</script>

<div class="game-item-ingredients-tree">
    <svg
        class="game-item-ingredients-tree__tree"
        style="transform: scale(1.3)"
        width="{ treeWidth - 100 }"
        height="{ treeHeight + 100 }"
        viewBox="0 0 { treeWidth } { treeHeight }"
    >
        <g>
            <g class="links"></g>
            <g class="nodes"></g>
        </g>
    </svg>
</div>

<style>
    .game-item-ingredients-tree {
        width: fit-content;
        margin: 0 auto;
    }

    :global(g.node) {
        fill: #001328;
        transition: fill 0.2s ease;
    }

    :global(g.node:not(:has(.parent))) {
        cursor: pointer;
    }

    :global(g.node:has(.not-counted)) {
        fill: #541212;
    }

    @media (prefers-color-scheme: light) {
        :global(g.node) {
            fill: rgb(172, 202, 150);
        }
        :global(g.node:has(.not-counted)) {
            fill: #D95454;
        }
    }
</style>