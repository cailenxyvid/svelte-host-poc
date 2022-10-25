<script>
    // import utilities
    // import { setContext, getContext } from 'svelte'
    import { fade } from 'svelte/transition'

    // import stores
    import { openPanels } from '../../../db/stores'

    // import components
    import ShowFlow from "./ShowFlow/ShowFlow.svelte"    
    import ContentTool from "../../shared/ContentTool/ContentTool.svelte"
    import HostNavigation from './HostNavigation.svelte'
  
    

    // action (event) handlers
    export let toggleGoLive
    export let setViewState

    // component props
    export let event

    // local state
    let panels = {
        ContentTool: false,
        ShowFlow: false
    }

    // local actions
    let togglePanel = panel => {
        panels[panel] = !panels[panel]
    }
    
</script>

<div transition:fade class="relative h-4/5">
    <div class="absolute -right-0 -top-5">
        <HostNavigation {togglePanel} {panels}></HostNavigation>
    </div>

    <!-- grid container/template -->
    <div class="grid grid-rows-host grid-cols-4 gap-4">
        {#if panels.ShowFlow}
        <div class="col-span-3">
            <ShowFlow live={event.live} currentState={event.viewstate} {toggleGoLive} {setViewState} />
        </div>        
        {/if}

        {#if panels.ContentTool}
        <div class="row-span-3 row-start-1 col-start-4">
            <ContentTool activeEvent={event.id}></ContentTool>
        </div>        
        {/if}

        <div class="row-start-2"><h1>Slidedeck?</h1></div>
    </div>    
</div>
