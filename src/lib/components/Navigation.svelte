<script lang="ts">
	import { page } from '$app/stores';
	import { getDrawerStore, AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer(): void {
		drawerStore.close();
	}
</script>


<nav class="h-full">
	<AppRail background="bg-primary-50 dark:bg-surface-500">
		<svelte:fragment slot="lead">
			<!-- Home -->
			<AppRailAnchor
				href="/"
				selected={$page.url.pathname === '/'}
				class="flex"
				on:click={closeDrawer}
			>
				<i class="fa-solid fa-coins text-3xl"></i>
			</AppRailAnchor>
		</svelte:fragment>

		<!-- Search -->
		<AppRailAnchor
			href="/"
			selected={$page.url.pathname === '/search'}
			class="flex"
			on:click={closeDrawer}
		>
			<i class="fa-solid fa-magnifying-glass text-xl"></i>
		</AppRailAnchor>

		<!-- Watched -->
		<AppRailAnchor
			href="/"
			selected={$page.url.pathname === '/watched'}
			class="flex"
			on:click={closeDrawer}
		>
			<i class="fa-solid fa-heart text-xl"></i>
		</AppRailAnchor>

		<!-- Github -->
		<svelte:fragment slot="trail">
			<AppRailAnchor
				href="https://github.com/JaidenDeChon"
				class="flex"
			>
				<i class="fa-brands fa-github text-3xl"></i>
			</AppRailAnchor>
		</svelte:fragment>
	</AppRail>
</nav>
