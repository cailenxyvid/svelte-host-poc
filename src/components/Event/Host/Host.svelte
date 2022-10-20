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

<div transition:fade class="view host">
    <HostNavigation {togglePanel}></HostNavigation>

    {#if panels.ShowFlow}
    <ShowFlow live={event.live} currentState={event.viewstate} {toggleGoLive} {setViewState} />
    {/if}

    {#if panels.ContentTool}
    <ContentTool activeEvent={event.id}></ContentTool>
    {/if}
</div>
