<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';
    import { afterNavigate, disableScrollHandling } from '$app/navigation';
    import '../scss/base.scss';

    export let data;

    const duration = 300;
    const delay = duration + 100;
    const y = 10;

    const transitionIn = { easing: cubicOut, y, duration, delay };
    const transitionOut = { easing: cubicIn, y: -y, duration };

    afterNavigate(() => {
        disableScrollHandling();
        setTimeout(() => {
            scrollTo({ top: 0, behavior: 'instant' });
        }, 400);
    });
</script>

<header class="container">
    <nav>
        <ul>
            <li>
                <strong>osrs-ge-skiller</strong>
            </li>
        </ul>
    
        <ul>
            <li><a href="/" class="secondary">Home</a></li>
            <li><a href="/item-browser" class="secondary">Item Browser</a></li>
        </ul>
    </nav>
</header>

{#key data.pathname}
    <main
        class="container-fluid"
        in:fly={transitionIn}
        out:fly={transitionOut}
    >
        <slot />
    </main>
{/key}

<style>
    header {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        margin: auto;
        transform: translate(0 -25%);
    }

    main.container-fluid {
        padding: 5rem 0 0 0;
    }

    @media(prefers-color-scheme: dark) {
        header a.secondary,
        nav ul li strong {
            color: rgba(255, 255, 255, 0.6);
        }
    }
</style>
