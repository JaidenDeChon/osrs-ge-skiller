<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';
    import { Accordion, AccordionItem, modeCurrent } from '@skeletonlabs/skeleton';
    import { timeSince } from '$lib/helpers/timeSince';
    import type { GameItem } from '$lib/models/GameItem';
    import ImageWithText from './ImageWithText.svelte';
    import SuperNewGameItemCard from './SuperNewGameItemCard.svelte';

    export let item: GameItem;
    export let spacing = '';

    export let showXpStats = false;
    export let openXpStats = false;

    export let showGeData = false;
    export let openGeData = false;

    export let showAlchemy = false;
    export let openAlchemy = false;

    export let showTree = false;
    export let openTree = false;

    $: ingredients = item.creationSpecs?.ingredients ?? [];

    // View transition-related functionality
    const duration = 300;
	const delay = duration + 100;
	const y = 10;

	const transitionIn = { easing: cubicOut, y, duration };
	const transitionOut = { easing: cubicIn, y: -y, duration };
</script>

<Accordion {spacing} class="variant-soft-surface p-6 rounded-md dark:variant-ghost-primary">

    <!-- GE Data -->
    {#if showGeData}
        <AccordionItem
            open={openGeData}
            class="bg-surface-200 border border-surface-800 rounded-md dark:variant-filled-surface"
        >
            <svelte:fragment slot="lead">
                <img
                    class="h-8 w-8"
                    src="/other-images/grand-exchange.png"
                    alt="grand exchange icon"
                />
            </svelte:fragment>

            <svelte:fragment slot="summary">
                <p class="{ $modeCurrent ? 'text-primary-900' : 'text-primary-100' }">GE price data</p>
            </svelte:fragment>

            <svelt:fragment slot="content">
                <div class="table-container my-2">
                    <table class="table table-hover variant-filled-surface dark:variant-soft-primary">
                        <thead>
                            <tr class="variant-filled-surface dark:variant-soft-primary">
                                <th>Metric</th>
                                <th>Value</th>
                                <th>Time since</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>High value</td>
                                <td>{ item.highPrice }</td>
                                <td>{ item.highTime ? timeSince(item.highTime) : '' }</td>
                            </tr>
                            <tr>
                                <td>Low value</td>
                                <td>{ item.lowPrice }</td>
                                <td>{ item.lowTime ? timeSince(item.lowTime) : '' }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </svelt:fragment>
        </AccordionItem>
    {/if}

    <!-- Skills data -->
    {#if showXpStats && item.creationSpecs}
        <AccordionItem
            open={openXpStats}
            class="bg-surface-200 border border-surface-800 rounded-md dark:variant-filled-surface"
        >
            <svelte:fragment slot="lead">
                <img
                    class="h-8 w-8"
                    src="/skill-images/skills.png"
                    alt="skills icon"
                />
            </svelte:fragment>

            <svelte:fragment slot="summary">
                <p class="{ $modeCurrent ? 'text-primary-900' : 'text-primary-100' }">Skill data</p>
            </svelte:fragment>

            <svelt:fragment slot="content">
                <ImageWithText
                    src="/skill-images/skills.png"
                    alt="Skill-levels icon"
                    drawCirlce={false}
                >
                    <strong>Levels required</strong>
                </ImageWithText>
        
                <div class="table-container my-2">
                    <table class="table table-hover variant-filled-surface dark:variant-soft-primary">
                        <thead>
                            <tr class="variant-filled-surface dark:variant-soft-primary">
                                <th>Skill name</th>
                                <th>Required level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each item.creationSpecs.requiredSkills as skillRequirement}
                                <tr>
                                    <td class="capitalize">{skillRequirement.skillName}</td>
                                    <td>{skillRequirement.skillLevel}</td>
                                </tr>
                            {/each }
                        </tbody>
                    </table>
                </div>

                <ImageWithText
                    src="/skill-images/skills.png"
                    alt="Skill-levels icon"
                    drawCirlce={false}
                >
                    <strong>XP Given</strong>
                </ImageWithText>
        
                <div class="table-container my-2">
                    <table class="table table-hover variant-filled-surface dark:variant-soft-primary">
                        <thead>
                            <tr class="variant-filled-surface dark:variant-soft-primary">
                                <th>Skill name</th>
                                <th>Experience given</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each item.creationSpecs.experienceGranted as experienceGranted}
                                <tr>
                                    <td class="capitalize">{experienceGranted.skillName}</td>
                                    <td>{experienceGranted.experienceAmount}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </svelt:fragment>
        </AccordionItem>
    {/if}

    <!-- Alchemy values -->
    {#if showAlchemy}
        <AccordionItem
            open={openAlchemy}
            class="bg-surface-200 border border-surface-800 rounded-md dark:variant-filled-surface"
        >
            <svelte:fragment slot="lead">
                <img
                    class="h-6 w-6 mr-2"
                    src="/spell-images/high-level-alchemy.png"
                    alt="high-level alchemy spell icon"
                >
            </svelte:fragment>

            <svelte:fragment slot="summary">
                <p class="{ $modeCurrent ? 'text-primary-900' : 'text-primary-100' }">Alchemy values</p>
            </svelte:fragment>

            <svelte:fragment slot="content">
                <div class="table-container my-2">
                    <table class="table table-hover variant-filled-surface dark:variant-soft-primary">
                        <thead>
                            <tr class="variant-filled-surface dark:variant-soft-primary">
                                <th>Metric</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>High alch</td>
                                <td>{ item.highAlch }</td>
                            </tr>
                            <tr>
                                <td>Low alch</td>
                                <td>{ item.lowAlch }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </svelte:fragment>
        </AccordionItem>
    {/if}

    {#if showTree && ingredients.length}
        <AccordionItem
            open={openTree}
            class="bg-surface-200 border border-surface-800 rounded-md dark:variant-filled-surface"
        >
            <svelte:fragment slot="lead">
                <div class="flex justify-center items-center w-8 h-8 rounded-full variant-filled-primary">
                    <img
                        class="w-4 h-4"
                        src="/svg-icons/checklist.svg"
                        alt="checklist icon"
                    >
                </div>
            </svelte:fragment>

            <svelte:fragment slot="summary">
                <p class="{ $modeCurrent ? 'text-primary-900' : 'text-primary-100' }">Ingredients</p>
            </svelte:fragment>

            <svelte:fragment slot="content">
                <div
                    in:fly={ { ...transitionIn, delay } }
                    out:fly={ transitionOut }
                    class="p-4 mb-4 gap-4 grid grid-cols-1 lg:grid-cols-2"
                    style="align-items: start"
                >
                    {#each ingredients as ingredient}
                        {#if ingredient.item.creationSpecs?.ingredients.length}
                            <a href="item/{ingredient.item.id}">
                                <SuperNewGameItemCard item={ingredient.item} enableHoverEffect />
                            </a>
                        {/if}
                        {#if !ingredient.item.creationSpecs?.ingredients.length}
                            <SuperNewGameItemCard item={ingredient.item} />
                        {/if}
                    {/each}
                </div>
            </svelte:fragment>
        </AccordionItem>
    {/if}

</Accordion>
