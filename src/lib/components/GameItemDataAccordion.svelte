<script lang="ts">
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import type {
        GameItem,
        SkillLevelDesignation,
        GameItemCreationExperienceGranted
    } from '$lib/models/GameItem';
    import { timeSince } from '$lib/helpers/timeSince';
    import ImageWithTextPill from './ImageWithTextPill.svelte';
    import GameItemCard from './GameItemCard.svelte';

    export let item: GameItem;
    export let treeColumnCount = 0;
    export let spacing = '';
    export let linkToIngredients = false;

    export let showXpStats = false;
    export let openXpStats = false;

    export let showGeData = false;
    export let openGeData = false;

    export let showAlchemy = false;
    export let openAlchemy = false;

    export let showTree = false;
    export let openTree = false;


    $: ingredients = item.creationSpecs?.ingredients ?? [];

    function getLevelRequirements (item: GameItem): SkillLevelDesignation[] {
		return item.creationSpecs?.requiredSkills ?? [];
	}

	function getXpGranted (item: GameItem): GameItemCreationExperienceGranted[] {
		return item.creationSpecs?.experienceGranted ?? [];
	}
</script>

<Accordion {spacing}>

    <!-- GE Data -->
    {#if showGeData}
        <AccordionItem open={openGeData}>
            <svelte:fragment slot="lead">
                <img
                    class="h-8 w-8"
                    src="/other-images/grand-exchange.png"
                    alt="grand exchange icon"
                />
            </svelte:fragment>

            <svelte:fragment slot="summary">GE price data</svelte:fragment>

            <svelt:fragment slot="content">
                <div class="flex flex-col sm:flex-row sm:justify-start gap-3 md:flex-row justify-evenly">
                    <ImageWithTextPill
                        src="/item-images/coins-few.png"
                        alt="just a few coins"
                        title="Low"
                        subtitle="{item.lowPrice} GP"
                        subtitleAside={ item.lowTime ? `(${timeSince(item.lowTime, true)})` : '' }
                    />
                    <ImageWithTextPill
                        src="/item-images/coins-lots.png"
                        alt="lots of coins"
                        title="High"
                        subtitle="{item.highPrice} GP"
                        subtitleAside={ item.highTime ? `(${timeSince(item.highTime, true)})` : '' }
                    />
                </div>
            </svelt:fragment>
        </AccordionItem>
    {/if}

    <!-- Skills data -->
    {#if showXpStats && item.creationSpecs}
        <AccordionItem open={openXpStats}>
            <svelte:fragment slot="lead">
                <img
                    class="h-8 w-8"
                    src="/skill-images/skills.png"
                    alt="skills icon"
                />
            </svelte:fragment>

            <svelte:fragment slot="summary">Skill data</svelte:fragment>

            <svelt:fragment slot="content">
                <div class="flex flex-col sm:flex-row sm:justify-start gap-3 md:flex-row justify-evenly">
                    {#each getLevelRequirements(item) as requirement}
                        <ImageWithTextPill
                            src="/skill-images/{requirement.skillName}.png"
                            alt="{requirement.skillName} skill icon"
                            title="Skill requirement"
                            subtitle="{requirement.skillLevel} {requirement.skillName}"
                        />
                    {/each}

                    {#each getXpGranted(item) as xpGranted}
                    <ImageWithTextPill
                        src="/skill-images/{xpGranted.skillName}.png"
                        alt="{xpGranted.skillName} skill icon"
                        title="XP granted"
                        subtitle="{xpGranted.experienceAmount} {xpGranted.skillName} XP"
                    />
                    {/each}
                </div>
            </svelt:fragment>
        </AccordionItem>
    {/if}

    <!-- Alchemy values -->
    {#if showAlchemy}
        <AccordionItem open={openAlchemy}>
            <svelte:fragment slot="lead">
                <img
                    class="h-6 w-6 mr-2"
                    src="/spell-images/high-level-alchemy.png"
                    alt="high-level alchemy spell icon"
                >
            </svelte:fragment>

            <svelte:fragment slot="summary">Alchemy values</svelte:fragment>

            <svelte:fragment slot="content">
                <div class="flex flex-col sm:flex-row sm:justify-start gap-3 md:flex-row justify-evenly">
                    <ImageWithTextPill
                        src="/spell-images/low-level-alchemy.png"
                        alt="low alchemy"
                        title="Low alch"
                        subtitle="{item.lowAlch} GP"
                    />
                    <ImageWithTextPill
                        src="/spell-images/high-level-alchemy.png"
                        alt="high alchemy"
                        title="High alch"
                        subtitle="{item.highAlch} GP"
                    />
                </div>
            </svelte:fragment>
        </AccordionItem>
    {/if}

    {#if showTree && ingredients.length}
        <AccordionItem open={openTree}>
            <svelte:fragment slot="lead">
                <div class="flex justify-center items-center w-8 h-8 rounded-full variant-filled-primary">
                    <img
                        class="w-4 h-4"
                        src="/svg-icons/checklist.svg"
                        alt="checklist icon"
                    >
                </div>
            </svelte:fragment>

            <svelte:fragment slot="summary">Ingredients</svelte:fragment>

            <svelte:fragment slot="content">
                <div class="grid gap-6 {treeColumnCount ? `grid-cols-${treeColumnCount}` : 'grid-cols-1 xl:grid-cols-2'}" style="align-items: start">
                    {#each ingredients as ingredient}
                        <GameItemCard
                            item={ingredient.item}
                            enableBlur={false}
                            amount={ingredient.amount}
                            {linkToIngredients}
                            showXpStats
                            showGeData
                            showAlchemy
                            showTree
                        />
                    {/each}
                </div>
            </svelte:fragment>
        </AccordionItem>
    {/if}

</Accordion>
