<script lang="ts">
    import type { PageData } from '../$types';
    import type { GameItem } from '$lib/models/GameItem';

    export let data: PageData;
    $: itemDetails = (data as any).itemDetails as GameItem;
</script>

<hgroup>
    <h1>{ itemDetails.name }</h1>
    <h2>{ itemDetails.examineText }</h2>
</hgroup>
