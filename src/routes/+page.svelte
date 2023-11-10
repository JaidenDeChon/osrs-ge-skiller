<script lang="ts">
    import { goto } from "$app/navigation";

    function navigateToItemBrowser() {
        goto('/item-browser');
    }
</script>

<hgroup>
    <h1>ge-skiller</h1>

    <h2>
        Welcome! ge-skiller calculates the most profitable items that can be created for experience in a given skill in
        an effort to either offset or eradicate the price of skilling. Apply your account's skill levels and other
        specifics to nail down exactly what's right for you, or cast a wide net to find the most profitable items that
        can be made.
    </h2>
</hgroup>

<button on:click={navigateToItemBrowser}>Start browsing items</button>
