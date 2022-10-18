<script>
    export let viewAction = (event_id) => {
        console.error("EventList component: no viewAction defined")
    }
    export let events
</script>

<h1>Event List</h1>
<li>sort by column</li>
<li>search by name</li>

<ul class="eventList">
    {#each events as event}
    <li class="eventItem">
        <span class="eventItemActions">
            <i class="fa fa-search" on:click={() => { viewAction(event.id)}}></i>
        </span>
        <a href="/#/event/{event.id}">{event.title}</a>
    </li>
    {/each}
</ul>