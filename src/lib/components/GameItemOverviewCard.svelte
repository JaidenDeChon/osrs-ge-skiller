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

<article class="game-item-overview">
    <header>
        <div class="game-item-overview__title-container">
            <div class="game-item-overview__title-container-image-circle">
                <img
                    src="/item-images/{ gameItem.image }"
                    alt="{ gameItem.name }"
                />
            </div>
            <div class="game-item-overview__title-text-container">
                <p>{ gameItem.name }</p>
                <p class="secondary">{ gameItem.examineText }</p>
            </div>
        </div>
    </header>

    <div class="game-item-overview__body">
        <!-- Item XP data -->
        <div class="game-item-overview__icon-text-section">
            {#each levelsRequired as levelRequirementDetails}
                <ImageWithText
                    src="{getSkillImage(levelRequirementDetails.skillName)}"
                    alt="{levelRequirementDetails.skillName} icon"
                    vertical
                >
                    <span>
                        {levelRequirementDetails.skillLevel} {levelRequirementDetails.skillName} required
                    </span>
                </ImageWithText>
            {/each}

            {#each experienceGranted as experienceDetails}
                <ImageWithText
                    src="{getSkillImage(experienceDetails.skillName)}"
                    alt="{experienceDetails.skillName} icon"
                    vertical
                >
                    <span class="secondary">
                        {experienceDetails.experienceAmount} xp granted
                    </span>
                </ImageWithText>
            {/each}
        </div>

        <!-- Item value section -->
        <div class="game-item-overview__icon-text-section">
            <!-- GE low -->
            <ImageWithText
                src="/item-images/coins-few.png"
                alt="A few coins."
                vertical
            >
                <span class="secondary">
                    {gameItem.lowPrice}
                    {#if gameItem.lowTime}
                        <span class="secondary"> ({timeSince(gameItem.lowTime, true)})</span>
                    {/if}
                </span>
            </ImageWithText>

            <!-- GE high -->
            <ImageWithText
                src="/item-images/coins-lots.png"
                alt="Lots of coins!"
                vertical
            >
                <span class="secondary">
                    {gameItem.highPrice}
                    {#if gameItem.highTime}
                        <span class="secondary"> ({timeSince(gameItem.highTime, true)})</span>
                    {/if}
                </span>
            </ImageWithText>

            <!-- Low alch -->
            <ImageWithText
                src="/spell-images/low-level-alchemy.png"
                alt="Low level alchemy spell icon"
                vertical
            >
                <span class="secondary">{gameItem.lowAlch}</span>
            </ImageWithText>

            <!-- High alch -->
            <ImageWithText
                src="/spell-images/high-level-alchemy.png"
                alt="High level alchemy spell icon"
                vertical
            >
                <span class="secondary">{gameItem.highAlch}</span>
            </ImageWithText>
        </div>

        <button
            class="secondary"
            on:click={ () => navigateToItemDetails(gameItem.id) }
        >
            Details
        </button>
    </div>

</article>

<style>
    .game-item-overview {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .game-item-overview header {
        height: 8rem;
    }

    .game-item-overview__title-container {
        display: flex;
        gap: 1rem;
    }

    .game-item-overview__title-container-image-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 4rem;
        width: 4rem;
        min-width: 4rem;
        min-height: 4rem;
        background-color: var(--card-background-color);
        border-radius: 50%;
    }

    .game-item-overview__title-container img {
        width: 100%;
        height: 100%;
        max-width: 2.4rem;
        max-height: 2.4rem;
        object-fit: contain;
    }

    .game-item-overview__title-text-container {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .game-item-overview__title-text-container p {
        margin: 0;
    }

    .game-item-overview__icon-text-section {
        display: flex;
        gap: 1.3rem;
    }

    :global(.game-item-overview__icon-text-section > *) {
        width: 100%;
    }

    :global(.game-item-overview__icon-text-section .image-with-text) {
        text-align: center;
    }

    .game-item-overview__body {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .game-item-overview__body button {
        margin-bottom: 0;
    }

    span.secondary {
        color: var(--muted-color);
    }
</style>
