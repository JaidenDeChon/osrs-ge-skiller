<script lang="ts">
    export let enableBlur = true;
    export let compact = false;
    export let enableHover = false;
    export let variant = 'surface' as 'surface' | 'primary' | 'secondary' | 'tertiary';
    const slots = $$slots;
</script>

<!-- Overall container for applying blurry border -->
<div class="{enableHover ? 'card card-hover' : 'card' } {enableBlur ? `variant-glass-${variant}` : 'variant-soft-primary'} border-solid border border-primary-900 shadow-xl">

    <!-- Header slot -->
    {#if slots.header}
        <header class="card-header pb-4">
            <slot name="header" />
        </header>
    {/if}

    {#if !compact}
        {#if slots.body || slots.footer}
            <div class="p-4 text-{variant}-900 dark:bg-{variant}-900 dark:text-{variant}-50 {!slots.footer ? 'rounded-b-sm' : ''}">
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
    {/if}
</div>
