<script lang="ts">
    import { getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';
    import SearchBar from './SearchBar.svelte';

    const drawerStore = getDrawerStore();

    function openDrawer(): void {
		drawerStore.open();
	}
</script>

<div class="h-20 flex items-center gap-6 pr-8 mx-auto max-w-6xl">
    <!-- Hamburger button; hidden on large screens -->
    <button
        class="flex items-center justify-center h-20 w-20 lg:hidden"
        on:click={openDrawer}
    >
        <i class="fa-solid fa-burger text-2xl"></i>
    </button>

    <a href="/" class="lg:ml-8 font-bold">osrs-ge-skiller</a>

    <div class="absolute m-auto left-0 right-0 w-min hidden lg:block">
        <SearchBar />
    </div>

    <div class="ml-auto">
        <LightSwitch
            ring="ring-2 ring-primary-800"
            fillLight="fill-primary-300"
            fillDark="fill-primary-800"
            rounded="rounded-full"
        />
    </div>

    <button class="flex items-center justify-center">
        <i class="fa-solid fa-bell"></i>
    </button>
</div>
