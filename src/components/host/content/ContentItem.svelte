<script>
    // import components
    import ContentItemActions from "./ContentItemActions.svelte";

    // component actions
    export let deleteItem

    // component props
    export let item
</script>

<li class="contentItem {item.active ? 'active' : ''}">
    <span>{item.title}</span>
    <ContentItemActions {item} {deleteItem}></ContentItemActions>
</li>