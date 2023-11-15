<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { ModalNamesEnum } from '$lib/enums/ModalNamesEnum';
	import Card from '$lib/components/Card.svelte';

	const modalStore = getModalStore();

	function fireStatsModal() {
		modalStore.trigger({
			type: 'component',
			component: ModalNamesEnum.PLAYER_SKILLS_MODAL,
			meta: { navigateToItemBrowserUponClose: true }
		});
	}
</script>

<div class="container p-10 space-y-4">
	<h1 class="h1">Welcome to osrs-ge-skiller!</h1>
	<p class="py-4">
		Find the most profitable OSRS items you can make given your skill levels.
		Powered by real-time Grand Exchange price stats.
	</p>

	<button
		class="btn variant-filled-primary"
		on:click={fireStatsModal}
	>
		Enter your stats
	</button>

	<a
		href="/item-browser/"
		class="btn variant-soft-primary"
	>
		Start browsing items
	</a>
</div>
