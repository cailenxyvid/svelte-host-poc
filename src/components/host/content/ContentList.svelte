<script>
    // import utilities 
    import { newContentItem, deleteContentItem } from "../../../db/mockAPI";

    // import components
    import FormModal from "../../shared/FormModal.svelte";
    import ContentItem from "./ContentItem.svelte";
    import ContentFilter from "./ContentFilter.svelte";
    
    // component props
    export let items;
    export let reloadItems;

    // local props
    let showNew = false;
    let filterType;

    // local actions
    let handleNewItem = async (event) => {
        const formData = new FormData(event.target)
        
        let newItem = {
            title: formData.get('title'),
            type: formData.get('type')
        }

        newContentItem(newItem);
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
        reloadItems()
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
    {#await items}
    <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
    {:then itemList}         
        {#each itemList as item}
        <ContentItem {item} deleteItem={deleteContentItem}></ContentItem>        
        {/each}
    {/await}

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