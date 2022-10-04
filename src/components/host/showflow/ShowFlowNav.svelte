<script>
    // import components
    import ShowFlowButton from "./ShowFlowButton.svelte";

    // action handlers
    export let toggleGoLive
    export let setViewState;

    // component props
    export let live = false;
    export let currentState;
</script>
<div class="showflowNav">
    <button on:click={toggleGoLive} class="golive {live ? 'active' : ''}">Go Live</button>
    <ShowFlowButton state="VS" {currentState} {setViewState} />
    <ShowFlowButton state="vS" {currentState} {setViewState} />
    <ShowFlowButton state="Vs" {currentState} {setViewState} />
</div>