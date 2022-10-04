<script>
    export let setViewState
    
    export let state;
    export let currentState
</script>

<button on:click={() => {setViewState(state)}} class="showFlowButton {currentState == state ? 'active' : ''}">{state}</button>