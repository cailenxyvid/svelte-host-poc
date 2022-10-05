<script>    
    // action (event) handlers
    export let setViewState

    // local actions
    let handleClick = async (event) => {
        let button = event.currentTarget;
        button.disabled = true;
        button.innerHTML = "..."
        await setViewState(state);
        button.disabled = false;
        button.innerHTML = state;
    }
    
    // component props
    export let state;
    export let currentState
</script>

<button on:click={handleClick} class="showFlowButton {currentState == state ? 'active' : ''}">{state}</button>