<script>
    import { fade } from "svelte/transition"
    import Accordion from "../shared/Accordion.svelte"

    // export let event
    export let setActiveView
    export let toggleMenu
    export let menuOpen
</script>

<div id="EventMenuToggle" on:click={toggleMenu}
    class="absolute -right-3 -top-0 p-1 bg-white text-emerald-900 border-emerald-900 border cursor-pointer rounded-full h-8 w-8 flex items-center justify-center">
    <i class="fa fa-arrow-{menuOpen ? 'left' : 'right fa-beat'}"></i>
</div>

<ul class="mt-8">
    <li>
        <i class="fa fa-tv-retro" title="Viewer"></i>
        <!-- i hate this, native css would allow just toggling one parent selector -->
        {#if menuOpen}        
        <span in:fade>Viewer</span>
        {/if}
    </li>
    <li on:click={() => { setActiveView('Reporting') }}>
        <i class="fa fa-file-chart-column" title="Reporting"></i>
        {#if menuOpen}        
        <span in:fade>Reporting</span>
        {/if}
    </li>
    <li on:click={() => { setActiveView('Archive') }}>  
        <i class="fa fa-box-archive" title="Archive"></i>      
        {#if menuOpen}        
        <span in:fade>Archiving</span>
        {/if}
    </li>
    <li>                
        {#if menuOpen}        
        <span in:fade={{ delay: 200 }}>
        <Accordion title="Event Actions" icon="square-list">
        <ul>
            <li>
                Duplicate Event
            </li>
            <li>
                Delete Event
            </li>
        </ul>
        </Accordion>
        </span>
        {:else}
        <i class="fa fa-square-list" title="Event Actions"></i>
        {/if}
    </li>
</ul>