<script>
    // import utilities 
    import { newContentItem, deleteContentItem } from "../../..//db/mockAPI";

    // import components
    import FormModal from "../../shared/FormModal.svelte";
    import ContentItem from "./ContentItem.svelte";
    import ContentFilter from "./ContentFilter.svelte";
    
    // component props
    export let items;
    export let reloadItems;

    // local props
    let showNew = false;

    // local actions
    let handleNewItem = async (event) => {
        const formData = new FormData(event.target)
        console.log('new item form', formData.get('title'))
        let newItem = {
            title: formData.get('title'),
            type: formData.get('type')
        }

        newContentItem(newItem);
        showNew = false;
    }

    let filterItems = async (type) => {
        reloadItems()
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

{#await items}
    Loading Content Items
{:then itemList} 
    <ContentFilter filterAction={filterItems} searchAction={searchItems} />
    {#each itemList as item}
    <ContentItem {item} deleteItem={deleteContentItem}></ContentItem>        
    {/each}
{/await}

<div class="contentListTools">
    <button on:click={() => { showNew = true }}>New Item</button>
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