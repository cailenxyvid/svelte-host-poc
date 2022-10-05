<script>    
    // action (event) handlers
    export let action;

    // local actions
    let handleClick = async (event) => {
        let button = event.currentTarget;
        button.disabled = true;
        
        let promise = await action(value);
        button.disabled = false;        

        return promise;
    }
    let promise;
    
    // component props
    export let value = true;   
    export let active = false;
</script>

<button on:click={(e) => { promise = handleClick(e)}} class="showFlowButton {active ? 'active' : ''}">
    {#await promise}
        ...
    {:then p} 
        <slot></slot>
    {/await}
</button>