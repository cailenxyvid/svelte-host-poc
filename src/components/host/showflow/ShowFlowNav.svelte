<script>
    // import components
    import ShowFlowButton from "./ShowFlowButton.svelte";
    import AsyncButton from "../../shared/AsyncButton.svelte";

    // action handlers
    export let toggleGoLive
    export let setViewState;

    // component props - passed from event "model" in host component 
    export let live;
    export let currentState;
</script>

<div class="showflowNav">    
    <AsyncButton action={toggleGoLive} active={live} classes="goLiveButton">Go live</AsyncButton>
    <ShowFlowButton state="vS" {currentState} {setViewState} />
    <ShowFlowButton state="Sv" {currentState} {setViewState} />
    <ShowFlowButton state="Vs" {currentState} {setViewState} />
    <ShowFlowButton state="sV" {currentState} {setViewState} />
    <ShowFlowButton state="VS" {currentState} {setViewState} />
    <ShowFlowButton state="SV" {currentState} {setViewState} />
    <ShowFlowButton state="V" {currentState} {setViewState} />
    <ShowFlowButton state="S" {currentState} {setViewState} />
</div>