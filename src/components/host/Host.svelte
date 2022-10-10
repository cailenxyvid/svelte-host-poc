<script>
    // import utilities
    import { setContext, getContext } from 'svelte'

    // import stores
    import { openPanels } from '../../db/stores'

    // import components
    import ShowFlowNav from "./ShowFlow/ShowFlow.svelte"
    import ShowFlowEditor from './ShowFlow/ShowFlowEditor.svelte';
    import ContentList from "../shared/ContentTool/ContentList.svelte"
    

    // action (event) handlers
    export let toggleGoLive
    export let setViewState
    export let resetContentItems

    // component props
    export let event
    export let contentPromise
    
</script>

<div class="view host">
    <ShowFlowNav live={event.live} currentState={event.viewstate} {toggleGoLive} {setViewState} />
    <h1>Host View New: {event.title}</h1>

    {#if $openPanels.showFlowEditor}
        <ShowFlowEditor />
    {/if}
    <ContentList items={contentPromise} reloadItems={resetContentItems}></ContentList>
</div>
