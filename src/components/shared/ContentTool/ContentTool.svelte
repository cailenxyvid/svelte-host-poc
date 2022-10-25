<script>
    // import store
    import { loadStore, contentStore } from "../../../db/state/contentState";

    // import components
    import FormModal from "../FormModal.svelte";
    import Loader from "../Loader.svelte";
    import DataUpdateIndicator from "../DataUpdateIndicator.svelte";
    import NewItemButton from "../NewItemButton.svelte";
    import ErrorItem from "../ErrorItem.svelte";
    import ContentItem from "./ContentItem.svelte";
    import ContentFilter from "./ContentFilter.svelte";
    
    // component props    
    export let activeEvent; //# should probably be using context API for this

    // initial data/state
    let loadingContent = loadStore(activeEvent);

    // local props
    let showNew = false;
    let filterType = "all";

    // local actions
    //# these could be moved to a lib for cleanliness
    let reloadItems = async () => {
        return loadingContent = loadStore(activeEvent)
    }
    
    let newItem = async (event) => {
        const formData = new FormData(event.target)
        
        let newItem = {
            title: formData.get('title'),
            type: formData.get('type'),
            event_id: activeEvent
        }
        
        contentStore.addItem(newItem)
        showNew = false;
    }

    let deleteItem = (id) => {
        try {
            contentStore.deleteItem(id)
        } catch (error) {
            console.error(error)
        }
    }

    let updateItem = (item) => {
        try {
            contentStore.updateItem(item)
        } catch (error) {
            console.error(error)
        }
    }

    let filterItems = async (type) => {
        filterType = type;
        await reloadItems()
        if (type == 'all')
            return
        if (type == 'active') {
            $contentStore.items =  $contentStore.items.filter(item => item.active)    
            return
        }                
        
        $contentStore.items =  $contentStore.items.filter(item => item.type == type)
    }

    let searchItems = async (query) => {
        await reloadItems()
        
        $contentStore.items =  $contentStore.items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    }
</script>

<div id="ContentTool" class="mt-6 p-1 h-full border bg-slate-50 rounded-md">    
    <div class="contentFilterTools bg-slate-400 p-4 pb-0 rounded-md w-full text-sm">                
        <NewItemButton action={() => { showNew = true }}>New Item</NewItemButton>
        <ContentFilter filterAction={filterItems} searchAction={searchItems} activeType={filterType} />
    </div>
    {#await loadingContent}
        <Loader />
    {/await}
    {#if $contentStore.dirty}
        <DataUpdateIndicator />
    {/if}
    <div class="errors">
        {#each $contentStore.errors as error}
            <ErrorItem {error}></ErrorItem>
        {/each}
    </div>
    <div id="ContentItems" class="overflow-y-auto h-4/5">
        {#each $contentStore.items as item}
        <ContentItem {item} {deleteItem} {updateItem}></ContentItem>
        {/each}    
    </div>    
</div>

{#if showNew}
<!-- the internal form elements could be moved to a component for cleanliness - ContentNewItemForm -->
<div class="absolute top-0 left-1/3 p-5 bg-slate-400 grid h-1/4 place-items-center">
    <FormModal formHandler={newItem} close={()=>{ showNew = false }}>
        <label for="title">Title</label>
        <input type="text" name="title" class="border" />

        <label for="type">Type</label>
        <select name="type" class="border">
            <option value="word">Word Document</option>
            <option value="slidedeck">Slidedeck</option>
            <option value="quiz">Quiz</option>
            <option value="poll">Poll</option>
        </select>
    </FormModal>
</div>    
{/if}
