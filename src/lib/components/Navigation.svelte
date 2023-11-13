<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={closeDrawer}>Home</a></li>
		<li><a href="/my-character" on:click={closeDrawer}>Watched items</a></li>
		<li><a href="/item-browser" on:click={closeDrawer}>Browse all items</a></li>
        <li><a href="/item-browser?prompt-for-info=true" on:click={closeDrawer}>Browse by stats</a></li>
        <li><a href="/about" on:click={closeDrawer}>About</a></li>
	</ul>
</nav>
