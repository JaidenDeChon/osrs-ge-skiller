<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import Card from './Card.svelte';

	const drawerStore = getDrawerStore();

	function closeDrawer(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4 flex flex-col h-full">
	<ul>
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
		
					<div class="flex gap-4">
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
							<i class="fa-brands fa-linkedin"></i>
							LinkedIn
						</a>
					</div>
				</div>
			</svelte:fragment>
		</Card>
	</div>
</nav>
