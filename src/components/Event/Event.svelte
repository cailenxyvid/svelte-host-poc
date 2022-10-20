<script>
    // framework tools
    import { onMount } from 'svelte'

    // import utilities     
    import { supabase } from "../../db/supabaseClient"
    import { loadEvent } from "../../db/mockAPI"

    // import components
    import Loader from '../shared/Loader.svelte'
    import Host from "./Host/Host.svelte"
    import Settings from './Settings/Settings.svelte'
    import Archive from './Archive/Archive.svelte'
    import Reporting from './Reporting/Reporting.svelte'
    import EventNavigation from './EventNavigation.svelte'
    import EventMenu from './EventMenu.svelte'
    import EventFooter from './EventFooter.svelte'
    
    // router params
    export let params = {}

    // local vars
    let activeEvent = params.id    
    let activeView
    let menuOpen = false
    let eventPromise 

    // subscribe to DB changes, results will reload corresponding promises
    supabase
    .channel('public:event:id=eq.'+activeEvent)
    .on('postgres_changes', { event: 'update', schema: 'public', table: 'event' }, payload => {    
        eventPromise = payload.new    
    })
    .subscribe()

     //# these actions could go into a lib for cleanliness 
     let toggleMenu = () => {
        menuOpen = !menuOpen
     }

     let setActiveView = (view) => {
        activeView = view
     }

    let toggleGoLive = async () => {
        let event = await eventPromise

        const { data, error } = await supabase
        .from('event')
        .update({ live: !event.live })
        .match({ id: activeEvent })

        if (error) throw error

        // no further action required since the DB subscription takes over
    }

    let setViewState = async (vs) => {  
        const { data, error } = await supabase
        .from('event')
        .update({ viewstate: vs })
        .match({ id: activeEvent })

        if (error) throw error

        return data; // we don't need the data (because of subscription), but this returns a promise we can await on 
    }

    // view management experiment
    let views = {
        Host: {
            component: Host,
            props: { toggleGoLive, setViewState}
        },
        Settings: {
            component: Settings,
            props: {}
        },
        Archive: {
            component: Archive,
            props: {}
        },
        Reporting: {
            component: Reporting,
            props: {}
        }
    }

    // load the initial data
    //# reactive statement used to update component when route params change. could use {#key} instead. or another pattern?
    //# this might change entirely with state management anyway
    $: if (activeEvent = params.id) {        
        eventPromise = loadEvent(activeEvent);
    }
</script>



{#await eventPromise}
    <Loader text="Loading Event {params.id}" />
{:then event} 
    {#if event}
        <EventNavigation {event} {activeView} {menuOpen} {setActiveView} {toggleMenu}></EventNavigation>
        <!-- Main View Component -->
        {#if activeView}
            <svelte:component this={views[activeView].component} {event} {...views[activeView].props} />
        {/if}
        {#if menuOpen}
            <EventMenu {event} {setActiveView}></EventMenu>
        {/if}
        <EventFooter />
    {:else}
        <h1>Event not found</h1>
    {/if}
{:catch error}
    <p style="color: red">{error.message}</p>    
{/await}  