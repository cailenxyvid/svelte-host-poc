<script>
    // import components
    import ShowFlowNav from "../components/host/showflow/ShowFlowNav.svelte"

    // action (event) handlers
    export let toggleGoLive
    export let setViewState

    // component props
    export let event;
</script>

<div class="view host">
    <ShowFlowNav live={event.live} currentState={event.viewstate} {toggleGoLive} {setViewState} />
    <h1>Host View: {event.title}</h1>
</div>
