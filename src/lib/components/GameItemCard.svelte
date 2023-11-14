<script lang="ts">
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import { timeSince } from '$lib/helpers/timeSince';
    import type {
        GameItem,
        GameItemCreationSkillRequirement,
        GameItemCreationExperienceGranted
    } from '$lib/models/GameItem';
    import ImageWithTextPill from './ImageWithTextPill.svelte';

    const slots = $$slots;

    export let item: GameItem;
    export let showXpStats = false;
    export let showGeData = false;
    export let showAlchemy = false;
    export let showTree = false;
    export let enableBlur = true;
    export let amount = 1;
    export let isParent = false;

    $: ingredients = item.creationSpecs?.ingredients ?? [];

    function getLevelRequirements (item: GameItem): GameItemCreationSkillRequirement[] {
		return item.creationSpecs?.requiredSkills ?? [];
	}

	function getXpGranted (item: GameItem): GameItemCreationExperienceGranted[] {
		return item.creationSpecs?.experienceGranted ?? [];
	}

</script>

<!-- Overall container for applying blurry border -->
<div class="card {enableBlur ? 'variant-glass-surface' : 'variant-soft-primary'} border-solid border border-primary-900 shadow-xl">

    <!-- The card itself, transparent so other elements can be too -->
    <div class="bg-transparent">

        <!-- Header -->
        <header class="card-header p-6">
            <div class="flex gap-6">
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
        </header>

        <!-- Card content container -->
        <div class="p-4 bg-surface-50 text-surface-900 dark:bg-surface-900 dark:text-surface-50 {!slots.footer ? 'rounded-b-sm' : ''}">
            <Accordion>
                <!-- Skills data -->
                {#if showXpStats && item.creationSpecs}
                    <AccordionItem>
                        <svelte:fragment slot="lead">
                            <img
                                class="h-8 w-8"
                                src="/skill-images/skills.png"
                                alt="skills icon"
                            />
                        </svelte:fragment>

                        <svelte:fragment slot="summary">Skill data</svelte:fragment>

                        <svelt:fragment slot="content">
                            <div class="flex flex-col gap-3 md:flex-row justify-evenly my-4">
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

                <!-- GE Data -->
                {#if showGeData}
                    <AccordionItem>
                        <svelte:fragment slot="lead">
                            <img
                                class="h-8 w-8"
                                src="/other-images/grand-exchange.png"
                                alt="grand exchange icon"
                            />
                        </svelte:fragment>

                        <svelte:fragment slot="summary">GE price data</svelte:fragment>

                        <svelt:fragment slot="content">
                            <div class="flex flex-col gap-3 md:flex-row justify-evenly my-4">
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

                <!-- Alchemy values -->
                {#if showAlchemy}
                    <AccordionItem>
                        <svelte:fragment slot="lead">
                            <img
                                class="h-6 w-6 mr-2"
                                src="/spell-images/high-level-alchemy.png"
                                alt="high-level alchemy spell icon"
                            >
                        </svelte:fragment>

                        <svelte:fragment slot="summary">Alchemy values</svelte:fragment>

                        <svelte:fragment slot="content">
                            <div class="flex flex-col gap-3 md:flex-row justify-evenly my-4">
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
                    <AccordionItem>
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
                            {#each ingredients as ingredient}
                                <svelte:self
                                    item={ingredient.item}
                                    enableBlur={false}
                                    amount={ingredient.amount}
                                    showXpStats
                                    showGeData
                                    showAlchemy
                                    showTree
                                />
                            {/each}
                        </svelte:fragment>
                    </AccordionItem>
                {/if}

            </Accordion>

            <!-- Footer slot -->
            {#if slots.footer}
                <footer class="card-footer p-0 mt-4">
                    <slot name="footer"/>
                </footer>
            {/if}
        </div>
    </div>
</div>
