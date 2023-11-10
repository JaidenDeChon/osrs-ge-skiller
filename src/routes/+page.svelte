<script lang="ts">
    import { goto } from "$app/navigation";

    function navigateToItemBrowser() {
        goto('/item-browser');
    }
</script>

<article>
    <hgroup>
        <h1>osrs-ge-skiller</h1>
    
        <p>
            Find the most profitable OSRS items you can make given your skill levels. Powered by real-time Grand Exchange price stats.
        </p>
    </hgroup>

    <button on:click={navigateToItemBrowser}>Start browsing items</button>

    <footer>
        <span>Made with ❤️ by <a href="https://GitHub.com/JaidenDeChon">Jaiden DeChon</a></span>
    </footer>
</article>
