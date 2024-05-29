<script lang="ts">
	import '../app.postcss';
	import type { ComponentEvents } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { beforeNavigate, afterNavigate, disableScrollHandling } from '$app/navigation';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { AppShell, storePopup, initializeStores, Drawer, getToastStore, Toast, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import AppHeader from '$lib/components/global/AppHeader.svelte';

	let scrollPosition = 0;

	function scrollHandler(event: ComponentEvents<AppShell>['scroll']) {
		scrollPosition = event.currentTarget.scrollTop;
	}

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Local app stuff
	import { ModalNamesEnum } from '$lib/enums/ModalNamesEnum';
	import Navigation from '$lib/components/global/Navigation.svelte';
	import SkillLevelsModal from '$lib/components/modal/SkillLevelsModal.svelte';

	// Grabs the data from +layout.ts
	export let data;

	// Initialize skeleton stores
	initializeStores();
	const toastStore = getToastStore();

	// Set up modal registry
	const modalRegistry: Record<ModalNamesEnum, ModalComponent> = {
		[ModalNamesEnum.PLAYER_SKILLS_MODAL]: { ref: SkillLevelsModal }
	};

	// Navigation transition-related functionality
	const duration = 300;
	const delay = duration + 100;
	const y = 10;

	const transitionIn = { easing: cubicOut, y, duration };
	const transitionOut = { easing: cubicIn, y: -y, duration };

	let loadingToastId = '';

	beforeNavigate(() => {
		// Show a loading toast so they know we're working on it.
		toastStore.trigger({
			autohide: false,
			hoverable: false,
			message: '⏳ Loading...',
			hideDismiss: true,
			classes: 'variant-filled-secondary shadow-lg',
			callback(response) {
				loadingToastId = response.id;
			},
		});
	});

	afterNavigate(() => {
		// Dismiss loading toast.
		toastStore.close(loadingToastId);
		loadingToastId = '';

		// Stuff for making transiton nicer.
        disableScrollHandling();
        setTimeout(() => {
			document.getElementById('page')?.scroll({ top: 0, behavior: 'instant' });
            // scrollTo({ top: 0, behavior: 'instant' });
        }, 400);
    });
</script>

<!-- Toast -->
<Toast />

<!-- Modal -->
<Modal
	components={modalRegistry}
	transitionIn={fly}
	transitionOut={fly}
	transitionInParams={transitionIn}
	transitionOutParams={transitionOut}
/>

<Drawer width="w-20">
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell
	regionPage="relative"
	slotPageHeader="sticky top-0 z-20 transition-colors {scrollPosition === 0 ? '' : 'bg-primary-50 dark:bg-surface-500'}"
	slotSidebarLeft="overflow-y-hidden shadow-xl w-0 lg:w-20"
	on:scroll={scrollHandler}
>
	<!-- Sidebar -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<!-- Header -->
	<svelte:fragment slot="pageHeader">
		<AppHeader />
	</svelte:fragment>

	<!-- Page Route Content -->
	{#key data.pathname}
		<div
			in:fly={ { ...transitionIn, delay } }
			out:fly={ transitionOut }
			class="mx-auto w-full"
		>
			<slot />
		</div>
	{/key}
</AppShell>

<style>

	:global(html) {
		-webkit-tap-highlight-color: rgba(128, 128, 128, 0.5);
	}

	:global(body) {

		background-image:
			radial-gradient(
				circle at 0% 40%,
				rgba(var(--color-primary-500) / .33) 0px,
				transparent 60%
			);
	}

	:global(#page) {
		overflow-y: auto;
	}

	:global(.modal-backdrop) {
		overflow-y: scroll;
		background-color: transparent !important;
		backdrop-filter: blur(20px);
	}

</style>
