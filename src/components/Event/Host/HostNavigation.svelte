<script>
    import { slide } from 'svelte/transition'

    export let togglePanel
    export let panels
    
    let showControls
</script>

<span id="HostNavigation">
    {#if showControls}
        <span transition:slide class="controls bg-slate-400 p-4 rounded-full">
            <i on:click={()=>{ togglePanel('ContentTool') }} class="fa fa-file {panels.ContentTool ? 'text-xyvid-green' : '' }" alt="Content"></i>
            <i on:click={()=>{ togglePanel('ShowFlow') }} class="fa fa-sliders {panels.ShowFlow ? 'text-xyvid-green' : '' }" alt="Show Flow"></i>
        </span>
    {/if}

    <i on:click={() => { showControls = !showControls }} class="fa fa-th-large {showControls ? 'text-xyvid-green' : 'fa-beat' }"></i>
</span>