<script>
    // component actions
    export let deleteItem

    // component props
    export let item
</script>

<li class="contentItem">
    <span>{item.title}</span>
    <div class="actions">
        <span on:click={() => { deleteItem(item.id) }}>(X)</span>
    </div>
</li>