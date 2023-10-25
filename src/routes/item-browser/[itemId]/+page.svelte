<script lang="ts">
    import { page } from '$app/stores';
    const itemId = $page.params.itemId;
</script>

<hgroup>
    <h1>Individual item</h1>
    <h2>This is what will be shown on an individual item page.</h2>
</hgroup>

<p>Item id: {itemId}</p>
