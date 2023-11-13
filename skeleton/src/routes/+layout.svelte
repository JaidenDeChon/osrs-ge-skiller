<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { beforeNavigate, afterNavigate, disableScrollHandling } from '$app/navigation';

	// Skeleton
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { autoModeWatcher, initializeStores, Drawer, getDrawerStore, getToastStore, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Components
	import Navigation from '$lib/components/Navigation.svelte';

	export let data;

	initializeStores();

	const drawerStore = getDrawerStore();
	const toastStore = getToastStore();

	function openDrawer(): void {
		drawerStore.open();
	}

	function closeDrawer(): void {
		drawerStore.close();
	}

	// Navigation transition-related functionality
	const duration = 300;
	const delay = duration + 100;
	const y = 10;

	const transitionIn = { easing: cubicOut, y, duration, delay };
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

<!-- Nav drawer -->
<Drawer>
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell
	regionPage="relative"
	slotPageHeader="sticky top-0 z-10"
	slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64"
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar background="variant-glass-surface">

			<!-- Beginning of app bar -->
			<svelte:fragment slot="lead">
				<div class="flex items-center">

					<!-- Hamburger button (hidden on large screens) -->
					<button
						class="lg:hidden btn btn-sm mr-4 variant-soft-primary h-12 w-12"
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
						class="btn btn-sm variant-soft-primary"
						href="/"
					>
						Home
					</a>
					<a
						class="btn btn-sm variant-soft-primary"
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
			in:fly={ transitionIn }
			out:fly={ transitionOut }
			class="mx-auto max-w-screen-lg w-full md:px-12"
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

		background-image: radial-gradient(
			at 98% 98%,
			rgba(var(--color-success-500) / .33) 0px,
			transparent 60%
		);

		@media (prefers-color-scheme: light) {
			background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-primary-500) / .33) 0px,
				transparent 60%
			);
		}
	}

	:global(#page) {
		overflow-y: scroll;
	}

</style>
