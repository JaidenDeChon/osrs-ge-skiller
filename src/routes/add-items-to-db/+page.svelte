<script lang="ts">
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { kebabCase } from 'lodash';
    import type { PageData } from '../$types';
    import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
	import type { GameItem, GameItemCreationSpecs } from '$lib/models/GameItem';

    let isDev = false;

    export let data: PageData & { gameItems: GameItem[] };

    const toastStore = getToastStore();

    $: allGameItems = data.gameItems as GameItem[];
    $: allCategories = (data as any).categories as string[];
    $: allSkills = (data as any).skills as string[];

    onMount(() => {
        isDev = import.meta.env.DEV;
    });

    let id = '';
    let name = '';
    let examineText = '';
    let highAlch = 0;
    let lowAlch = 0;
    let creationSpecs = {
        experienceGranted: [],
        requiredSkills: [],
        ingredients: []
    } as GameItemCreationSpecs;

    let category = '';
    let skill = '';

    // Generates the image name based on the item name.
    $: image = kebabCase(name) + '.png';

    // If there are no creation specs, just use undefined.
    $: creationSpecsOrUndefined =
        (creationSpecs.experienceGranted.length ||
        creationSpecs.requiredSkills.length ||
        creationSpecs.ingredients.length)
            ? creationSpecs
            : undefined;

    // The new game item to be sent to the DB.
    $: newGameItem = {
        id,
        name,
        image,
        examineText,
        highAlch,
        lowAlch,
        creationSpecs: creationSpecsOrUndefined
    } as GameItem;

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

    async function submitNewItem(): Promise<void> {
        const newItemIdErrorMessage = 'No new item ID returned from DB. The item was most likely not saved.';
        const categoryIdErrorMessage = 'No category ID returned from DB. The category was most likely not saved.';
        const skillIdErrorMessage = 'No skill ID returned from DB. The skill was most likely not saved.';
        const successMessage = 'Item saved!';
        let newItemId: string | undefined;
        let categoryId: string | undefined;

        // Save the game item to the DB and save off the resulting Mongo ID.
        try {
            newItemId = await saveGameItem();     
        } catch (e: any) {
            toastStore.trigger({ message: newItemIdErrorMessage });
            console.error(newItemIdErrorMessage);
            throw Error(e);
        }

        if (!newItemId) {
            toastStore.trigger({ message: newItemIdErrorMessage });
            throw new Error(newItemIdErrorMessage);
        }

        // If there's no category or skill, we're done.
        if (!category && !skill) {
            toastStore.trigger({ message: successMessage });
            return;
        }

        // Link the item to the category and skill and save off that ID.
        try {
            categoryId = await linkItemToCategory(category, newItemId);
        } catch (e: any) {
            toastStore.trigger({ message: categoryIdErrorMessage });
            console.error(categoryIdErrorMessage);
            throw Error(e);
        }
    
        if (!categoryId) {
            toastStore.trigger({ message: categoryIdErrorMessage });
            throw new Error(categoryIdErrorMessage);
        }

        // Link the category to the skill.
        try {
            await linkCategoryToSkill(skill, categoryId);
        } catch (e: any) {
            toastStore.trigger({ message: skillIdErrorMessage });
            throw Error(e);
        }

        toastStore.trigger({ message: successMessage });
    }

    async function saveGameItem(): Promise<string | undefined> {
        try {
            const response = await fetch('/api/db/game-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newGameItem)
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            console.log('GameItem created:', result);
            return result._id;
        } catch (e) {
            console.error('Error creating game item: ', e);
        }
    }

    async function linkItemToCategory(categoryName: string, newItemId: string): Promise<string | undefined> {
        try {
            const response = await fetch('/api/db/game-item-categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryName, newItemId })
            });

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            console.log('Item added to category.', result);
            return result._id;
        } catch (e) {
            console.error('Error adding item to category: ', e);
        }
    }

    async function linkCategoryToSkill(skillName: string, categoryId: string) {
        try {
            const response = await fetch('/api/db/game-item-skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryId, skillName })
            });

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            console.log('Category linked to skill.', result);
        } catch (e) {
            console.error('Error linking category to skill: ', e);
        }
    }

</script>

<div class="p-6">
    <!-- {#if !isDev}
        <p class="mb-4">Hey! You're not supposed to be here!</p>
        <a href="/">Go back home</a>
    {/if} -->

    <!-- {#if isDev}
        
    {/if} -->

    <h2 class="h2">Add item to DB</h2>

    <!-- Category and skill parents -->
    <h3 class="h3 mt-6 mb-4">Category and skill parents</h3>

    <label
        class="flex flex-col mb-4"
        for="category"
    >
        Category
        <input
            class="input variant-ghost-primary"
            type="text"
            name="category"
            bind:value={category}
        />
    </label>

    <label
        class="flex flex-col mb-4"
        for="skill"
    >
        Skill
        <input
            class="input variant-ghost-primary"
            type="text"
            name="skill"
            bind:value={skill}
        />
    </label>

    <p>Or select from existing:</p>
    <div class="flex gap-4">
        <select
            placeholder="category"
            class="select variant-ghost-primary"
            name="category"
            bind:value={category}
        >
            {#each allCategories as categoryName}
                <option>{ categoryName }</option>
            {/each}
        </select> 

        <select
            placeholder="skill"
            class="select variant-ghost-primary"
            name="skill"
            bind:value={skill}
        >
            {#each allSkills as skill}
                <option>{ skill }</option>
            {/each}
        </select>
    </div>

    <!-- General information -->
    <h3 class="h3 mt-6 mb-4">General information</h3>

    <label
        class="flex flex-col mb-4"
        for="id"
    >
        Id
        <input
            class="input variant-ghost-primary"
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
            class="input variant-ghost-primary"
            type="text"
            name="name"
            bind:value={name}
        />
    </label>

    <label
        class="flex flex-col mb-4"
        for="examineText"
    >
        Examine text
        <input
            class="input variant-ghost-primary"
            type="text"
            name="examineText"
            bind:value={examineText}
        />
    </label>

    <!-- Alchemy values -->
    <h3 class="h3 mt-6 mb-4">Alchemy values</h3>

    <label
        class="flex flex-col mb-4"
        for="highAlch"
    >
        High alch
        <input
            class="input variant-ghost-primary"
            type="number"
            name="highAlch"
            bind:value={highAlch}
        />
    </label>

    <label
        class="flex flex-col mb-4"
        for="lowAlch"
    >
        Low alch
        <input
            class="input variant-ghost-primary"
            type="number"
            name="lowAlch"
            bind:value={lowAlch}
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
                class="select variant-ghost-primary"
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
                class="input variant-ghost-primary"
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
                class="select variant-ghost-primary"
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
                class="input variant-ghost-primary"
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
            <select bind:value={ingredient.item} class="select variant-ghost-primary">
                {#each allGameItems as gameItem}
                    <option value={gameItem._id}>{ gameItem.name }</option>
                {/each}
            </select>
        </label>

        <label class="flex flex-col mb-4">
            Amount
            <input
                class="input variant-ghost-primary"
                type="number"
                bind:value={ingredient.amount}
            />
        </label>

        <label class="flex flex-col mb-4">
            Consumed during creation?
            <input
                class="input variant-ghost-primary"
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
</div>
