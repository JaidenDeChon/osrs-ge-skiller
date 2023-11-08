<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    import type { GameItem } from '$lib/models/GameItem';

    export let gameItem: GameItem;

    interface TreeData {
        name: string;
        value?: string | number;
        children?: TreeData[];
    }

    onMount(() => {
        const tree = transformGameItemToD3(gameItem);
        d3Setup(tree);            
    });

    function d3Setup(treeData: TreeData) {
        const root = d3.hierarchy(treeData as unknown);

        const handleEvents = function(selection) {
            selection
                .on('mouseover', function() {
                    let g = d3.select(this);
                    let n = g.select('.the-node');

                    if (n.classed('solid')) {
                        n.transition()
                            .duration(400)
                            .style('fill', 'rgba(211, 0, 0, 0.8)')
                            .attr('r', 18)
                    } else {
                        n.transition()
                            .duration(400)
                            .style('fill', 'rgba(211, 0, 0, 0.8)')
                    }

                    g.select('label')
                        .transition()
                        .duration(700)
                        .style('fill', 'white');
                })
                .on('mouseout', function() {
                    let g = d3.select(this);
                    let n = g.select('.the-node');

                    if(n.classed('solid')) {
                        n.transition()
                            .duration(400)
                            .style('fill', "#696969" )
                            .attr('r',14);
                    } else {
                        n.transition()
                            .duration(400)
                            .style('fill', "rgba(255,255,255,0.2)" )
                    }
                        g.select('label')
                            .transition()
                            .duration(700)
                            .style('fill', "black")
                })
        }
    
        const clusterLayout = d3.cluster()
            .size([400, 200])
            (root)

        const tree = d3.select('.game-item-ingredients-tree__tree g.nodes');

        const treeNodes = tree.selectAll('g.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .classed('node', true)
            .call(handleEvents);

        treeNodes.append('circle')
            .classed('the-node solid', true)
            .attr('cx', c => c.x)
            .attr('cy', c => c.y)
            .attr('r', () => 14)
            .style('fill', '#696969');

        treeNodes.append('text')
            .attr('class', 'label')
            .attr('dx', d => d.x)
            .attr('dy', d => d.y + 4)
            .text(d => d.data.name);
        
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
            .attr('stroke', '#5f5f5f');
    }

    function transformGameItemToD3(item: GameItem): TreeData {
        const name = item.name;

        if (!item.creationSpecs || !item.creationSpecs.ingredients.length) {
            return { name };
        }

        const children = item.creationSpecs.ingredients.map(ingredient =>
            transformGameItemToD3(ingredient.item)
        );

        return { name, children };
    }

</script>

<div class="game-item-ingredients-tree">
    <svg
        class="game-item-ingredients-tree__tree"
        width="400"
        height="200"
        viewBox="0 0 400 240"
    >
        <g transform="translate(10, 20)">
            <g class="links"></g>
            <g class="nodes"></g>
        </g>
    </svg>
</div>

<style>
    .game-item-ingredients-tree {
        /* border: solid red; */
    }

    .game-item-ingredients-tree__tree {
        /* border: solid green; */
    }
</style>