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
    export let classes = "";
</script>

<button on:click={(e) => { promise = handleClick(e)}} class="{classes} {active ? 'active' : ''}">
    {#await promise}
        <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
    {:then p} 
        <slot></slot>
    {/await}
</button>