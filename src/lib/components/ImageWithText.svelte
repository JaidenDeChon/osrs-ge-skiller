<script lang="ts">
    // Image source attribute.
    export let src: string;
    // Image alt attribute.
    export let alt: string;
</script>

<div class="image-with-text">
    <img { src } { alt }>
    <slot />
</div>

<style>
    .image-with-text {
        display: flex;
        align-items: center;
        gap: 1em;
    }

    .image-with-text img {
        width: 1.6em;
        object-fit: contain;
    }

    :global(.image-with-text > *) {
        margin-bottom: 0;
    }

    :global(.image-with-text span) {
        font-size: 0.75em;
        color: var(--muted-color);
    }
</style>