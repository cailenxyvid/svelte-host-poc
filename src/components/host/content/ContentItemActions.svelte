<script>
    export let deleteItem
    
    export let item
</script>
<div class="actions">
    <span on:click={() => { deleteItem(item.id) }}><i class="fa fa-trash" aria-hidden="true"></i></span>
</div>