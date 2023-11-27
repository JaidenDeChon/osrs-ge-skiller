<script lang="ts">
    import type { PageData } from '../$types';
    import { onMount } from 'svelte';
    import { kebabCase } from 'lodash';
    import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
	import type { GameItem, GameItemCreationSpecs } from '$lib/models/GameItem';

    let isDev = false;
    export let data: PageData & { gameItems: GameItem[] };
    $: allGameItems = data.gameItems as GameItem[];

    onMount(() => {
        isDev = import.meta.env.DEV;
    });

    let id = '';
    let name = '';
    let creationSpecs = {
        experienceGranted: [],
        requiredSkills: [],
        ingredients: []
    } as GameItemCreationSpecs;

    $: image = kebabCase(name) + '.png';
    $: newGameItem = { id, name, image, creationSpecs } as GameItem;

    function addExperienceGranted() {
        creationSpecs.experienceGranted.push({
            skillName: '' as InGameSkillNamesEnum,
            experienceAmount: 0
        });
        creationSpecs.experienceGranted = [...creationSpecs.experienceGranted];
    }

    function addRequiredSkill() {
        creationSpecs.requiredSkills.push({
            skillName: '' as InGameSkillNamesEnum,
            skillLevel: 0
        });
        creationSpecs.requiredSkills = [...creationSpecs.requiredSkills];
    }

    function addIngredient() {
        creationSpecs.ingredients.push({
            amount: 0,
            consumedDuringCreation: false,
            item: { id: '-1', name: 'placeholder' }
        });
        creationSpecs.ingredients = [...creationSpecs.ingredients];
    }

    async function submitNewItem() {
        try {
            const response = await fetch('/api/db/game-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newGameItem)
            });

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            console.log('GameItem created:', result);
        } catch (e) {
            console.error('Error creating game item: ', e);
        }
    }
</script>

<div class="p-6">
    {#if !isDev}
        <p class="mb-4">Hey! You're not supposed to be here!</p>
        <a href="/">Go back home</a>
    {/if}

    {#if isDev}
        <h2 class="h2">Add item to DB</h2>

        <!-- General information -->
        <h3 class="h3 mt-6 mb-4">General information</h3>

        <label
            class="flex flex-col mb-4"
            for="id"
        >
            Id
            <input
                class="text-secondary-900"
                type="text"
                name="id"
                bind:value={id}
            />
        </label>

        <label
            class="flex flex-col mb-4"
            for="name"
        >
            Name
            <input
                class="text-secondary-900"
                type="text"
                name="name"
                bind:value={name}
            />
        </label>

        <!-- Experience granted -->
        <h3 class="h3 mt-6 mb-4">Experience Granted</h3>

        <button
            class="btn variant-filled-primary mb-4"
            on:click={addExperienceGranted}
        >
            add
        </button>

        {#each creationSpecs.experienceGranted as xpGrantedEntry}
            <label class="flex flex-col mb-4">
                Skill name
                <select
                    class="text-secondary-900"
                    bind:value={xpGrantedEntry.skillName}
                >
                    {#each Object.values(InGameSkillNamesEnum) as skill}
                        <option>{ skill }</option>
                    {/each}
                </select>
            </label>

            <label class="flex flex-col mb-4">
                Amount of xp granted
                <input
                    class="text-secondary-900"
                    type="number"
                    bind:value={xpGrantedEntry.experienceAmount}
                />
            </label>
        {/each}

        <!-- Required Skills -->
        <h3 class="h3 mt-6 mb-4">Required Skills</h3>

        <button
            class="btn variant-filled-primary mb-4"
            on:click={addRequiredSkill}
        >
            add
        </button>

        {#each creationSpecs.requiredSkills as requiredSkill}
            <label class="flex flex-col mb-4">
                Skill name
                <select
                    class="text-secondary-900"
                    bind:value={requiredSkill.skillName}
                >
                    {#each Object.values(InGameSkillNamesEnum) as skill}
                        <option>{ skill }</option>
                    {/each}
                </select>
            </label>

            <label class="flex flex-col mb-4">
                Skill level
                <input
                    class="text-secondary-900"
                    type="number"
                    bind:value={requiredSkill.skillLevel}
                />
            </label>
        {/each}

        <!-- Ingredients -->
        <h3 class="h3 mt-6 mb-4">Ingredients</h3>

        <button
            class="btn variant-filled-primary mb-4"
            on:click={addIngredient}
        >
            add
        </button>

        {#each creationSpecs.ingredients as ingredient}
            <label class="flex flex-col mb-4">
                Game Item
                <select bind:value={ingredient.item} class="text-secondary-900">
                    {#each allGameItems as gameItem}
                        <option value={gameItem._id}>{ gameItem.name }</option>
                    {/each}
                </select>
            </label>
    
            <label class="flex flex-col mb-4">
                Amount
                <input
                    class="text-secondary-900"
                    type="number"
                    bind:value={ingredient.amount}
                />
            </label>

            <label class="flex flex-col mb-4">
                Consumed during creation?
                <input
                    class="text-secondary-900"
                    type="checkbox"
                    bind:checked={ingredient.consumedDuringCreation}
                />
            </label>
        {/each}

        <br>

        <button
            class="btn variant-filled-primary mt-6"
            on:click={submitNewItem}
        >
            Submit
        </button>
    {/if}
</div>
