<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';
    import '../scss/base.scss';

    export let data;

    const duration = 300;
    const delay = duration + 100;
    const y = 10;

    const transitionIn = { easing: cubicOut, y, duration, delay };
    const transitionOut = { easing: cubicIn, y: -y, duration };
</script>

<header class="container">
    <nav>
        <ul>
            <li>
                <strong>ge-skiller</strong>
            </li>
        </ul>
    
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/item-browser">Item Browser</a></li>
        </ul>
    </nav>
</header>

{#key data.pathname}
    <main
        class="container"
        in:fly={transitionIn}
        out:fly={transitionOut}
    >
        <slot />
    </main>
{/key}

<footer class="container"></footer>
