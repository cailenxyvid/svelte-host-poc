<script>
    import { updateEvent } from "../../../db/mockAPI"

    import Loader from "../../shared/Loader.svelte"

    export let event

    let savePromise

    let saveChanges = async () => {
        savePromise = updateEvent(event)
    }
</script>

<h1 class="text-xl">Settings</h1>
{#await savePromise}
    <Loader />
{:then saveResult}
    <form on:submit|preventDefault={saveChanges}>
        <label for="title">Title</label>
        <input name="title" class="border" bind:value={event.title} />

        <label for="event_date">Event Date</label>
        <input type="date" name="event_date" class="border" bind:value={event.event_date} />

        <button type="submit" class="bg-xyvid-green text-white rounded-sm p-1">Save</button>
    </form>
{:catch error}
    Error: {error}
{/await}