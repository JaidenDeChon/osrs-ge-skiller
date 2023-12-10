<script lang="ts">

    // Image source attribute.
    export let src: string;

    // Image alt attribute.
    export let alt: string;

</script>

<div class="flex gap-4">
    <div class="flex items-center justify-center variant-soft-primary h-12 w-12 rounded-full">
        <img
            { src }
            { alt }
            class="h-7 w-7 object-contain"
        >
    </div>
    <div class="flex flex-col justify-center">
        <slot />
    </div>
</div>
