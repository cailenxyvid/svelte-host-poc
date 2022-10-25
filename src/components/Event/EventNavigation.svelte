<script>
    import EventStatusWidget from "./EventStatusWidget.svelte"

    export let setActiveView
    // export let toggleMenu

    export let event
    export let activeView
</script>

<nav id="EventNavigation" class="relative container">
    <div class="flex items-center justify-between">                
        <div class="flex space-x-4 ml-4 items-center cursor-pointer">
            <!-- <i on:click={toggleMenu} class="fa fa-bars {menuOpen ? '' : 'fa-beat' }" aria-hidden="true"></i>             -->
            <i on:click={()=>{ setActiveView('Settings') }} class="hover:text-xyvid-green fa fa-cog {activeView == 'Settings' ? 'text-xyvid-green' : ''}" aria-hidden="true"></i>            
            <i on:click={()=>{ setActiveView('Host') }} class="hover:text-xyvid-green fa fa-2x fa-video-camera {activeView == 'Host' ? 'text-xyvid-green' : '' }" aria-hidden="true"></i>
        </div>
        <div class="m-2">{event.title}</div>
        <EventStatusWidget {event}></EventStatusWidget>
    </div>    
</nav>
