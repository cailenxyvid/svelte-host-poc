<script>
    export let title
    export let icon = null

    let open = false;
</script>

<div class="accordion inline">    
    <div class="header" on:click={()=>{ open = !open }}>
        {#if icon}
        <i class="fa fa-{icon}"></i>
        {/if}
        {title}
        <i class="fa fa-caret-{ open ? 'up' : 'down'}" aria-hidden="true"></i>
    </div>
    {#if open}
        <div class="content">
            <slot></slot>
        </div>
    {/if}
</div>