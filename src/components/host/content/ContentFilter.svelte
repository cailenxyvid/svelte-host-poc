<script>
    // component actions
    export let filterAction
    export let searchAction
</script>

<div class="contentFilter">
    <span on:click={() => { filterAction('all') }} class="contentTypeTab">All</span>
    <span on:click={() => { filterAction('word') }} class="contentTypeTab">Doc</span>
    <span on:click={() => { filterAction('poll') }} class="contentTypeTab">Poll</span>
    <input type="text" on:change={ searchAction(this.value) } />
</div>