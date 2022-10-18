<script>
    import { loadEvents } from "../../db/mockAPI"
  import DataUpdateIndicator from "../shared/DataUpdateIndicator.svelte";

    import InfoModal from "../shared/InfoModal.svelte"
    import Loader from "../shared/Loader.svelte"

    import DashboardEventList from "./components/DashboardEventList.svelte"

    let previewEvent = (event_id) => {
        //#
    }

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
<InfoModal close={()=>{ showInfoModal = false }}>Pre/view Event component</InfoModal>
{/if}