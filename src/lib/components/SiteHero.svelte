<script lang="ts">
    import { getModalStore, modeCurrent } from '@skeletonlabs/skeleton';
	import { ModalNamesEnum } from '$lib/enums/ModalNamesEnum';

    const modalStore = getModalStore();

	function fireStatsModal() {
		modalStore.trigger({
			type: 'component',
			component: ModalNamesEnum.PLAYER_SKILLS_MODAL
		});
	}
</script>

<!-- Parent with gradient bg -->
<div class="hero-gradient w-full -mt-20">
	<!-- Theme filter -->
	<div class="hero-theme-filter relative w-full h-full {$modeCurrent ? 'dark' : 'light'}">
		<!-- Noise filter -->
		<div class="hero-gradient-noise w-full h-full bg-repeat bg-contain">
			<!-- Text content -->
			<div class="mx-auto pt-24 lg:pt-32 pb-24 flex flex-col justify-center p-8 max-w-6xl relative z-10">
				<h1 class="h1 mb-5">👋 Welcome to osrs-ge-skiller!</h1>
		
				<p>Find the most profitable OSRS items you can make given your skill levels.</p>
				<p>Powered by real-time Grand Exchange price stats.</p>
		
				<div class="flex gap-4 flex-wrap mt-5">
					<button
						class="btn variant-filled-secondary dark:variant-filled-primary shadow-lg"
						on:click={fireStatsModal}
					>
						Enter your skill levels
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hero-gradient {
		background: rgb(15,186,129);
		background: linear-gradient(135deg, rgba(79,70,229,1) 0%, rgba(15,186,129,1) 100%);
	}

	.hero-theme-filter::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		opacity: 40%;
		/* z-index: -1; */
	}

	.hero-theme-filter.dark::after {
		background-color: white;
	}

	.hero-theme-filter.light::after {
		background-color: black;
	}

	.hero-gradient-noise {
		background-image: url(https://grainy-gradients.vercel.app/noise.svg);
	}
</style>
