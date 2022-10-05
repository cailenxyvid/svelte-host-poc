<script>
    // import components
    import ShowFlowButton from "./ShowFlowButtonOld.svelte";
    import AsyncButton from "../../shared/AsyncButton.svelte";

    // action handlers
    export let toggleGoLive
    export let setViewState;

    // component props - passed from event "model" in host component 
    export let live;
    export let currentState;
</script>

<div class="showflowNav">    
    <AsyncButton action={toggleGoLive} active={live}>Go live</AsyncButton>
    <ShowFlowButton state="VS" {currentState} {setViewState} />
    <ShowFlowButton state="vS" {currentState} {setViewState} />
    <ShowFlowButton state="Vs" {currentState} {setViewState} />
</div>