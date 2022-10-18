<script>
    // this component acts as a context specific wrapper for the globally shared EventList component
    // we can use this to constrain the shared component to specific screen elements and define contextual actions
    // for now it pretty much just sits here

    import EventList from "../../shared/EventList/EventList.svelte"

    export let previewEvent
    export let events
</script>

<EventList {events} viewAction={previewEvent}></EventList>