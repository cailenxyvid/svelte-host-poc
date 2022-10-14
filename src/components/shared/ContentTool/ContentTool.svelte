<script>
    // import utilities 
    import { newContentItem, deleteContentItem } from "../../../db/mockAPI";

    // import store
    import { loadStore, contentStore } from "../../../db/stores/contentState";

    // import components
    import FormModal from "../FormModal.svelte";
    import ContentItem from "./ContentItem.svelte";
    import ContentFilter from "./ContentFilter.svelte";
    
    // component props
    export let items;
    export let reloadItems;
    export let activeEvent; //# should probably be using context API for this

    // data/state
    let loadingContent = loadStore(activeEvent);

    // local props
    let showNew = false;
    let filterType = "all";

    // local actions
    //# these could be moved to a lib for cleanliness
    let handleNewItem = async (event) => {
        const formData = new FormData(event.target)
        
        let newItem = {
            title: formData.get('title'),
            type: formData.get('type'),
            event_id: activeEvent
        }

        // newContentItem(newItem);
        ;(await contentStore).addItem(newItem)
        showNew = false;
    }

    let filterItems = async (type) => {
        filterType = type;
        await reloadItems()
        if (type == 'all')
            return        
        
        let itemList = await items;
        items = await itemList.filter(item => item.type == type)
    }

    let searchItems = async (query) => {
        await reloadItems()
        let itemList = await items;
        items = await itemList.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    }
</script>

<div class="contentList">    
    <div class="contentListTools">        
        <button on:click={() => { showNew = true }}>
            <i class="fa fa-plus-square" aria-hidden="true"></i>
            New Item
        </button>
        <ContentFilter filterAction={filterItems} searchAction={searchItems} activeType={filterType} />
    </div>
    <!-- {#await contentStore}
    <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
    {:then itemList}         
        {#each itemList as item}
        <ContentItem {item} deleteItem={deleteContentItem}></ContentItem>        
        {/each}
    {/await} -->
    {#await loadingContent}
        <h1>LOADING CONTENT</h1>
    {:then loadingDone} 
        content done
    {/await}
    {#each $contentStore.items as item}
    <ContentItem {item} deleteItem={deleteContentItem}></ContentItem>
    {/each}

</div>

{#if showNew}
    <FormModal formHandler={handleNewItem} close={()=>{ showNew = false }}>
        <label for="title">Title</label>
        <input type="text" name="title" />

        <label for="type">Type</label>
        <select name="type">
            <option value="word">Word Document</option>
            <option value="slidedeck">Slidedeck</option>
            <option value="quiz">Quiz</option>
            <option value="poll">Poll</option>
        </select>
    </FormModal>
{/if}