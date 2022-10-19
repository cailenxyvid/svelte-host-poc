<script>
    // import framework tools
    import { fly } from 'svelte/transition'

    // import components
    import ContentItemActions from "./ContentItemActions.svelte";

    // component actions
    export let deleteItem
    export let updateItem

    // component props
    export let item

    // local actions
    let toggleEdit = () => {
        edit = !edit
    }

    // local props
    let edit = false
</script>

<li transition:fly={{ duration: 800}} class="contentItem {item.active ? 'active' : ''}">
    {#if edit}
        <form on:submit|preventDefault={() => { 
            updateItem(item) 
            toggleEdit()
            }}>
            <label for="title">Title</label>
            <input name="title" bind:value={item.title} />

            <button type="submit">Save</button>
        </form>
    {:else}
        <b>{item.id}</b> <span>{item.title}</span>
    {/if}
    <ContentItemActions {item} {deleteItem} {toggleEdit}></ContentItemActions>
    {item.active} {item.sort}
</li>