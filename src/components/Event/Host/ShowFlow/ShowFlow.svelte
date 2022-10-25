<script>
    // import components
    import ShowFlowButton from "./ShowFlowButton.svelte"
    import ShowFlowEditorDrawer from "./ShowFlowEditorDrawer.svelte"
    import AsyncButton from "../../../shared/AsyncButton.svelte"
    import ToggleButton from "../../../shared/ToggleButton.svelte"

    // action handlers
    export let toggleGoLive
    export let setViewState

    // component props - passed from event "model" in host component 
    export let live
    export let currentState

    // local props
    let showFlowEditor = false
</script>

<div class="bg-gray-300">    
    <AsyncButton action={toggleGoLive} active={live} classes="goLiveButton">Go live</AsyncButton>
    <ShowFlowButton state="vS" {currentState} {setViewState} />
    <ShowFlowButton state="Sv" {currentState} {setViewState} />
    <ShowFlowButton state="Vs" {currentState} {setViewState} />
    <ShowFlowButton state="sV" {currentState} {setViewState} />
    <ShowFlowButton state="VS" {currentState} {setViewState} />
    <ShowFlowButton state="SV" {currentState} {setViewState} />
    <ShowFlowButton state="V" {currentState} {setViewState} />
    <ShowFlowButton state="S" {currentState} {setViewState} />

    <span class="relative">
        <ToggleButton toggle={() => { showFlowEditor = !showFlowEditor }} icon="th-large"></ToggleButton>
        {#if showFlowEditor}
        <span class="absolute right-0 top-5 bg-slate-500 p-1">
            <ShowFlowEditorDrawer></ShowFlowEditorDrawer>
        </span>
        {/if}
    </span>    
</div>