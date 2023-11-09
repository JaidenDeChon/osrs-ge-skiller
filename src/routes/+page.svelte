<script lang="ts">
    import { goto } from "$app/navigation";

    function navigateToItemBrowser() {
        goto('/item-browser');
    }
</script>

<div class="background"></div>

<div class="container">
    <article>
        <hgroup>
            <h1>osrs-ge-skiller</h1>
        
            <p>
                Find the most profitable OSRS items you can make given your skill levels. Powered by real-time Grand
                Exchange price stats.
            </p>

            <blockquote>
                Hey! This site is a work in progress, so check back often for new features.
            </blockquote>
        </hgroup>
        
        <button
            class="secondary"
            on:click={navigateToItemBrowser}
        >
            Start browsing items
        </button>

        <footer>
            Made with ❤ by <a href="https://github.com/JaidenDeChon">Jaiden DeChon</a>
        </footer>
    </article>
</div>

<style>
    .background {
        height: 100vh;
        width: 100%;
        background-image: url('site-images/hero.png');
        background-size: cover;
        background-position: center;
        top: 0rem;
        position: absolute;
    }

    .background::after {
        content: '';
        position: absolute;
        background-color: rgba(24, 35, 44, 0.7);
        height: 100%;
        width: 100%;
        z-index: 0;
    }

    .container {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 3;
        margin-top: 6rem;
    }

    article {
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        background-color: rgba(0, 0, 0, 0.4);
    }

    @media(prefers-color-scheme: light) {
        .background::after {
            display: none;
        }

        article {
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.7);
        }
    }
</style>
