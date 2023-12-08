<script lang="ts">
import { page } from '$app/stores';
import { getDrawerStore, AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	// import Card from './Card.svelte';

	const drawerStore = getDrawerStore();

	function closeDrawer(): void {
		drawerStore.close();
	}
</script>

<AppRail background="bg-primary-50 dark:bg-surface-500">
	<svelte:fragment slot="lead">
		<!-- Home -->
		<AppRailAnchor
			href="/"
			selected={$page.url.pathname === '/'}
			class="flex"
		>
			<i class="fa-solid fa-coins text-3xl"></i>
		</AppRailAnchor>
	</svelte:fragment>

	<!-- Search -->
	<AppRailAnchor
		href="/"
		selected={$page.url.pathname === '/search'}
		class="flex"
	>
		<i class="fa-solid fa-magnifying-glass text-xl"></i>
	</AppRailAnchor>

	<!-- Watched -->
	<AppRailAnchor
		href="/"
		selected={$page.url.pathname === '/watched'}
		class="flex"
	>
		<i class="fa-solid fa-heart text-xl"></i>
	</AppRailAnchor>

	<!-- Levels -->
	<AppRailAnchor
		href="/"
		selected={$page.url.pathname === '/levels'}
		class="flex"
	>
		<i class="fa-solid fa-chart-simple text-xl"></i>
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
<nav class="list-nav p-4 flex flex-col h-full">
	<!-- <ul>
		<li><a href="/" on:click={closeDrawer}>Home</a></li>
		<li><a href="/my-character" on:click={closeDrawer}>Watched items</a></li>
		<li><a href="/item-browser" on:click={closeDrawer}>Browse all items</a></li>
        <li><a href="/item-browser?prompt-for-info=true" on:click={closeDrawer}>Browse by stats</a></li>
        <li><a href="/about" on:click={closeDrawer}>About</a></li>
	</ul>

	<div class="inline-flex mt-auto mx-auto">
		<Card variant="secondary">
			<svelte:fragment slot="header">
				<div class="flex flex-col gap-4">
					<header>Made with ❤️ by Jaiden DeChon</header>
		
					<div class="flex flex-col gap-2">
						<a
							href="https://GitHub.com/JaidenDeChon"
							target="_blank"
							class="btn btn-sm bg-secondary-500 w-full"
						>
							<i class="fa-brands fa-square-github mr-3"></i>
							GitHub
						</a>
						
						<a
							href="https://linkedin.com/in/jaiden-dechon"
							target="_blank"
							class="btn btn-sm bg-secondary-500 w-full"
						>
							<i class="fa-brands fa-linkedin mr-3"></i>
							LinkedIn
						</a>
					</div>
				</div>
			</svelte:fragment>
		</Card>
	</div> -->
</nav>
