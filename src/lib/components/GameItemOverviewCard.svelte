<script lang="ts">
    import type {
        GameItem,
        GameItemCreationExperienceGranted,
        GameItemCreationSkillRequirement
    } from '$lib/models/GameItem';
    import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
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

    <div class="game-item-overview__xp-breakdown">
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

</article>

<style>
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

    .game-item-overview__xp-breakdown {
        display: flex;
        justify-content: space-around;
        gap: 1.3rem;
    }

    .secondary {
        color: var(--muted-color);
    }
</style>
