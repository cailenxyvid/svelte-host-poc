<script>
    import { slide } from 'svelte/transition'

    export let togglePanel
    
    let showControls
</script>

<span id="HostNavigation">
    {#if showControls}
        <span transition:slide class="controls">
            <i on:click={()=>{ togglePanel('ContentTool') }} class="fa fa-file" alt="Content"></i>
            <i on:click={()=>{ togglePanel('ShowFlow') }} class="fa fa-sliders" alt="Show Flow"></i>
        </span>
    {/if}

    <i on:click={() => { showControls = !showControls }} class="fa fa-th-large fa-beat"></i>
</span>