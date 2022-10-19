<script>
    export let event
    export let setActiveView
</script>

<ul>
    <li>
        Viewer
    </li>
    <li on:click={() => { setActiveView('Reporting') }}>
        Reporting
    </li>
    <li on:click={() => { setActiveView('Archive') }}>
        Archiving
    </li>
    <li>
        Event Actions
        <ul>
            <li>
                Duplicate Event
            </li>
            <li>
                Delete Event
            </li>
        </ul>
    </li>
</ul>