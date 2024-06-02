<script lang="ts">

    // Image source attribute.
    export let src: string;

    // Image alt attribute.
    export let alt: string;

    // Allows for custom classes on image element.
    export let imgClasses = '';

    // Controls whether to draw the soft circle around the image.
    export let drawCirlce = true;

</script>

<div class="flex gap-4">
    <div class="flex items-center justify-center { drawCirlce ? 'variant-soft-primary' : '' } h-12 w-12 rounded-full">
        <img
            { src }
            { alt }
            class="h-7 w-7 object-contain {imgClasses}"
        >
    </div>
    <div class="flex flex-col justify-center">
        <slot />
    </div>
</div>
