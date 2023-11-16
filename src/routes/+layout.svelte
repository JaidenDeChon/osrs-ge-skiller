<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { beforeNavigate, afterNavigate, disableScrollHandling } from '$app/navigation';

	// Skeleton
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		storePopup,
		autoModeWatcher,
		initializeStores,
		Drawer,
		getDrawerStore,
		getToastStore,
		Toast,
		Modal,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Local app stuff
	import { ModalNamesEnum } from '$lib/enums/ModalNamesEnum';
	import Navigation from '$lib/components/Navigation.svelte';
	import SkillLevelsModal from '$lib/components/modal/SkillLevelsModal.svelte';

	// Grabs the data from +layout.ts
	export let data;

	// Initialize skeleton stores
	initializeStores();
	const drawerStore = getDrawerStore();
	const toastStore = getToastStore();

	// Set up modal registry
	const modalRegistry: Record<ModalNamesEnum, ModalComponent> = {
		[ModalNamesEnum.PLAYER_SKILLS_MODAL]: { ref: SkillLevelsModal }
	};

	function openDrawer(): void {
		drawerStore.open();
	}

	// Navigation transition-related functionality
	const duration = 300;
	const delay = duration + 100;
	const y = 10;

	const transitionIn = { easing: cubicOut, y, duration };
	const transitionOut = { easing: cubicIn, y: -y, duration };

	let loadingToastId = '';

	beforeNavigate(() => {
		// Show a loading toast so they know we're workig on it.
		toastStore.trigger({
			autohide: false,
			hoverable: false,
			message: '⏳ Loading...',
			hideDismiss: true,
			classes: 'variant-filled-surface',
			callback(response) {
				loadingToastId = response.id;
			},
		})
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

<!-- Light/dark mode handler -->
<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

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

<!-- Nav drawer -->
<Drawer width="w-96">
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell
	regionPage="relative"
	slotPageHeader="shadow-lg"
	slotSidebarLeft="w-0 lg:w-80 shadow-xl bg-surface-500"
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar
			shadow="shadow-xl"
			class="variant-soft-primary"
		>

			<!-- Beginning of app bar -->
			<svelte:fragment slot="lead">
				<div class="flex items-center">

					<!-- Hamburger button (hidden on large screens) -->
					<button
						class="lg:hidden btn btn-sm mr-4 bg-primary-600 h-12 w-12"
						on:click={openDrawer}
					>
						<span>
							<svg
								viewBox="0 0 100 80"
								class="fill-token w-4 h-4"
							>
								<rect width="100" height="20" />
								<rect width="100" height="20" y="30" />
								<rect width="100" height="20" y="60" />
							</svg>
						</span>
					</button>
					<a
						href="/"
						class="w-0 h-0 invisible sm:visible sm:w-auto sm:h-auto"
					>
						<strong>osrs-ge-skiller</strong>
					</a>
				</div>
			</svelte:fragment>

			<!-- End of app bar -->
			<svelte:fragment slot="trail">
				<div class="sm-hidden">
					<a
						class="btn btn-sm bg-primary-600 text-surface-100"
						href="/"
					>
						Home
					</a>
					<a
						class="btn btn-sm bg-primary-600 text-surface-100"
						href="/item-browser"
					>
						Item Browser
					</a>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Sidebar -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<!-- Page Route Content -->
	{#key data.pathname}
		<div
			in:fly={ { ...transitionIn, delay } }
			out:fly={ transitionOut }
			class="mx-auto max-w-screen-2xl w-full md:px-12"
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
		overflow-y: scroll;
	}

	:global(.modal-backdrop) {
		overflow-y: scroll;
		background-color: transparent !important;
		backdrop-filter: blur(20px);
	}

</style>
