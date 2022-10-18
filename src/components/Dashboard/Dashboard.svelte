<script>
    import { loadEvents } from "../../db/mockAPI"

    import InfoModal from "../shared/InfoModal.svelte"
    import Loader from "../shared/Loader.svelte"

    import DashboardEventList from "./components/DashboardEventList.svelte"
    import PreviewEvent from "./components/PreviewEvent.svelte"

    let previewEvent = async (event_id) => {
        let events = await eventsPromise
        console.log(eventsPromise)
        
        selectedEvent = events.find(event => event.id == event_id)
        showInfoModal = true
    }

    let selectedEvent // for event preview
    let showInfoModal = false
    let eventsPromise = loadEvents() //# this should run through state management instead of directly loading
</script>

<h1>Dashboard</h1>
<h2>Here we could have a fancy, customizable grid based dashboard</h2>
<h3>In the meantime, here's a reusable Event List with context specific view action</h3>

{#await eventsPromise}
<Loader />
{:then events} 
<DashboardEventList {events} {previewEvent} />
{/await}


{#if showInfoModal}
<InfoModal close={()=>{ showInfoModal = false }}>
    <PreviewEvent event={selectedEvent} />
</InfoModal>
{/if}