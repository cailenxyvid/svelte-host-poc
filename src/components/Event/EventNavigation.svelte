<script>
    import EventStatusWidget from "./EventStatusWidget.svelte"

    export let setActiveView
    export let toggleMenu

    export let event
    export let activeView
    export let menuOpen
</script>

<div id="EventNavigation">
    <EventStatusWidget {event}></EventStatusWidget>
    <div class="actions">
        <i on:click={()=>{ setActiveView('Host') }} class="fa fa-2x fa-video-camera {activeView == 'Host' ? 'active' : '' }" aria-hidden="true"></i>
        <i on:click={()=>{ setActiveView('Settings') }} class="fa fa-cog {activeView == 'Settings' ? 'active' : ''}" aria-hidden="true"></i>
        <i on:click={toggleMenu} class="fa fa-bars {menuOpen ? 'active' : '' }" aria-hidden="true"></i>
    </div>
</div>
