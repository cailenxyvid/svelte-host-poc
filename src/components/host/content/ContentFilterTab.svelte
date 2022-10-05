<script>
    export let filterAction
    export let type
    export let activeType
    export let label
</script>

<span on:click={() => { filterAction(type) }} class="contentTypeTab {activeType == type ? 'active' : ''}">{label}</span>