<script>
    export let title

    let open = false;
</script>

<div class="accordion">
    <div class="header" on:click={()=>{ open = !open }}>
        {title}
        <i class="fa fa-caret-{ open ? 'up' : 'down'}" aria-hidden="true"></i>
    </div>
    {#if open}
        <div class="content">
            <slot></slot>
        </div>
    {/if}
</div>