<script>
    // import utilities
    import { setContext, getContext } from 'svelte'
    import { fade } from 'svelte/transition'

    // import stores
    import { openPanels } from '../../../db/stores'

    // import components
    import ShowFlowNav from "./ShowFlow/ShowFlow.svelte"
    import ShowFlowEditor from './ShowFlow/ShowFlowEditor.svelte';
    import ContentTool from "../../shared/ContentTool/ContentTool.svelte"
    

    // action (event) handlers
    export let toggleGoLive
    export let setViewState
    export let resetContentItems

    // component props
    export let event
    export let contentPromise
    
</script>

<div transition:fade class="view host">
    <ShowFlowNav live={event.live} currentState={event.viewstate} {toggleGoLive} {setViewState} />
    <h1>Host View New: {event.title}</h1>

    {#if $openPanels.showFlowEditor}
        <ShowFlowEditor />
    {/if}
    <ContentTool items={contentPromise} reloadItems={resetContentItems} activeEvent={event.id}></ContentTool>
</div>
