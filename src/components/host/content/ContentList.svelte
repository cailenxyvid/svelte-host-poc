<script>
    // import utilities 
    import { newContentItem } from "../../..//db/mockAPI";

    // import components
    import ContentItem from "./ContentItem.svelte";
    import FormModal from "../../shared/FormModal.svelte";
    
    // component props
    export let items;

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
</script>

{#await items}
    Loading Content Items
{:then itemList} 
    {#each itemList as item}
    <ContentItem {item}></ContentItem>        
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