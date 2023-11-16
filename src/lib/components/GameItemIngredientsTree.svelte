<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    import type { GameItem } from '$lib/models/GameItem';

    export let item: GameItem;

    const treeHeight = 200;
    let treeWidth = 400;
    let xTransform: number;

    interface TreeData {
        name: string;
        itemData?: GameItem;
        children?: TreeData[];
    }

    onMount(() => {
        const screenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerHeight || 0);
        xTransform = screenWidth - treeWidth;
        const tree = transformGameItemToD3(item);
        d3Setup(tree);
    });

    function d3Setup(treeData: TreeData) {
        const root = d3.hierarchy(treeData as unknown);

        // TODO - Maybe use this for a click event to toggle the material cost
        // const handleEvents = function(selection) {
        //     selection
        //         .on('mouseover', function() {
        //             let g = d3.select(this);
        //             let n = g.select('.the-node');

        //             if (n.classed('solid')) {
        //                 n.transition()
        //                     .duration(400)
        //                     .style('fill', 'rgba(211, 0, 0, 0.8)')
        //                     .attr('r', 18)
        //             } else {
        //                 n.transition()
        //                     .duration(400)
        //                     .style('fill', 'rgba(211, 0, 0, 0.8)')
        //             }

        //             g.select('label')
        //                 .transition()
        //                 .duration(700)
        //                 .style('fill', 'white');
        //         })
        //         .on('mouseout', function() {
        //             let g = d3.select(this);
        //             let n = g.select('.the-node');

        //             if(n.classed('solid')) {
        //                 n.transition()
        //                     .duration(400)
        //                     .style('fill', "#696969" )
        //                     .attr('r',14);
        //             } else {
        //                 n.transition()
        //                     .duration(400)
        //                     .style('fill', "rgba(255,255,255,0.2)" )
        //             }
        //                 g.select('label')
        //                     .transition()
        //                     .duration(700)
        //                     .style('fill', "black")
        //         })
        // }
    
        const clusterLayout = d3.cluster()
            .size([treeWidth, treeHeight])
            (root)

        const tree = d3.select('.game-item-ingredients-tree__tree g.nodes');

        const treeNodes = tree.selectAll('g.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .classed('node', true)
            // .call(handleEvents);

        const nodeHeight = 60;
        const nodeWidth = 140;

        treeNodes.append('circle')
            .classed('the-node solid', true)
            .attr('cx', c => c.x)
            .attr('cy', c => c.y)
            .attr('r', () => 28)
            .attr('stroke', 'rgb(11, 140, 97)');

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
        fill: rgb(7, 91, 63);
    }

    @media (prefers-color-scheme: light) {
        :global(g.node) {
            fill: rgb(172, 202, 150);
        }
    }
</style>