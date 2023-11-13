<script lang="ts">
    import { goto } from '$app/navigation';
    import type {
        GameItem,
        GameItemCreationExperienceGranted,
        GameItemCreationSkillRequirement
    } from '$lib/models/GameItem';
    import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
    import { timeSince } from '$lib/helpers/timeSince';
    import ImageWithText from './ImageWithText.svelte';

    export let gameItem: GameItem;
    export let classes = '';
    $: experienceGranted = gameItem.creationSpecs?.experienceGranted ?? [] as GameItemCreationExperienceGranted[];
    $: levelsRequired = gameItem.creationSpecs?.requiredSkills ?? [] as GameItemCreationSkillRequirement[];

    function getSkillImage (skillName: InGameSkillNamesEnum): string {
        const pre = '/skill-images/';
        switch (skillName) {
            case InGameSkillNamesEnum.CRAFTING:
                return pre + 'crafting.png';
            case InGameSkillNamesEnum.SMITHING:
                return pre + 'smithing.png';
            case InGameSkillNamesEnum.FLETCHING:
                return pre + 'fletching.png';
        }
    }

    function navigateToItemDetails (itemId: string): void {
        goto(`/item-browser/${itemId}`);
    }
</script>

<div class="card p-4 variant-soft-surface {classes}">
    <header class="card-header">
        <div class="flex items-center">
            <div class="rounded-full w-16 h-16 p-3 variant-soft-primary flex place-content-center">
                <img
                    class="w-full h-auto object-contain"
                    src="/item-images/{gameItem.image}"
                    alt="{gameItem.name}"
                >
            </div>
            <div class="flex flex-col ml-4">
                <strong class="text-lg">{gameItem.name}</strong>
                <p>{gameItem.examineText}</p>
            </div>
        </div>
    </header>

    <!-- Item XP data -->
    <div class="flex justify-around py-4">
        {#each levelsRequired as levelRequirementDetails}
            <ImageWithText
                src="{getSkillImage(levelRequirementDetails.skillName)}"
                alt="{levelRequirementDetails.skillName} icon"
                vertical
            >
                <p class="text-sm">
                    {levelRequirementDetails.skillLevel} {levelRequirementDetails.skillName} required
                </p>
            </ImageWithText>
        {/each}

        {#each experienceGranted as experienceDetails}
            <ImageWithText
                src="{getSkillImage(experienceDetails.skillName)}"
                alt="{experienceDetails.skillName} icon"
                vertical
            >
                <p class="text-sm">
                    {experienceDetails.experienceAmount} xp granted
                </p>
            </ImageWithText>
        {/each}
    </div>

    <!-- Item value section -->
    <div class="flex justify-around py-4">
        <!-- GE low -->
        <ImageWithText
            src="/item-images/coins-few.png"
            alt="A few coins."
            vertical
        >
            <p class="text-sm">
                {gameItem.lowPrice}
                {#if gameItem.lowTime}
                    <span class="secondary-text"> ({timeSince(gameItem.lowTime, true)})</span>
                {/if}
            </p>
        </ImageWithText>

        <!-- GE high -->
        <ImageWithText
            src="/item-images/coins-lots.png"
            alt="Lots of coins!"
            vertical
        >
            <p class="text-sm">
                {gameItem.highPrice}
                {#if gameItem.highTime}
                    <span class="secondary-text"> ({timeSince(gameItem.highTime, true)})</span>
                {/if}
            </p>
        </ImageWithText>

        <!-- Low alch -->
        <ImageWithText
            src="/spell-images/low-level-alchemy.png"
            alt="Low level alchemy spell icon"
            vertical
        >
            <p class="text-sm">{gameItem.lowAlch}</p>
        </ImageWithText>

        <!-- High alch -->
        <ImageWithText
            src="/spell-images/high-level-alchemy.png"
            alt="High level alchemy spell icon"
            vertical
        >
            <p class="text-sm">{gameItem.highAlch}</p>
        </ImageWithText>
    </div>

    <footer class="card-footer">
        <button
            class="btn variant-glass-primary w-full"
            on:click={ () => navigateToItemDetails(gameItem.id) }
        >
            Details
        </button>
    </footer>
</div>

<style>
    .secondary-text {
        opacity: 0.6;
    }
</style>
