<script lang="ts">
    export let enableBlur = true;
    const slots = $$slots;
</script>

<!-- Overall container for applying blurry border -->
<div class="card {enableBlur ? 'variant-glass-surface' : 'variant-soft-primary'} border-solid border border-primary-900 shadow-xl">

    <!-- The card itself, transparent so other elements can be too -->
    <div class="bg-transparent">

        <!-- Header slot -->
        {#if slots.header}
            <header class="card-header p-6">
                <slot name="header" />
            </header>
        {/if}

        {#if slots.body || slots.footer}
            <div class="p-4 bg-surface-50 text-surface-900 dark:bg-surface-900 dark:text-surface-50 {!slots.footer ? 'rounded-b-sm' : ''}">
                <!-- Body slot -->
                {#if slots.body}
                    <slot name="body"/>
                {/if}

                <!-- Footer slot -->
                {#if slots.footer}
                    <footer class="card-footer p-0 mt-4">
                        <slot name="footer"/>
                    </footer>
                {/if}
            </div>
        {/if}
    </div>
</div>
