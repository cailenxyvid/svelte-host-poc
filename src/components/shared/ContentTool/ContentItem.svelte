<script>
    // import framework tools
    import { fly } from 'svelte/transition'

    // import components
    import ContentItemActions from "./ContentItemActions.svelte";

    // component actions
    export let deleteItem

    // component props
    export let item
</script>

<li transition:fly={{ duration: 800}} class="contentItem {item.active ? 'active' : ''}">
    <b>{item.id}</b> <span>{item.title}</span>
    <ContentItemActions {item} {deleteItem}></ContentItemActions>
    {item.active} {item.sort}
</li>