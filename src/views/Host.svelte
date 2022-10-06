<script>
    // import utilities
    import { setContext, getContext } from 'svelte'

    // import stores
    import { openPanels } from '../db/stores'

    // import components
    import ShowFlowNav from "../components/host/showflow/ShowFlowNav.svelte"
    import ContentList from "../components/host/content/ContentList.svelte"
    import ShowFlowEditor from '../components/host/showflow/ShowFlowEditor.svelte';

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
