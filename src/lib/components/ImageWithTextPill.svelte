<script lang="ts">
    import ImageWithText from './ImageWithText.svelte';

    export let src: string;
    export let alt: string;

    export let title: string;
    export let subtitle = '';
    export let subtitleAside = '';
</script>

<div class="p-2 rounded-full variant-soft-primary">
    <ImageWithText
        {src}
        {alt}
    >
        <strong class="opacity-70 mr-4">{title}</strong>
        <p class="mr-4">
            {subtitle}
            {#if subtitleAside}
                <span class="text-sm opacity-70">{subtitleAside}</span>
            {/if}
        </p>
    </ImageWithText>
</div>
