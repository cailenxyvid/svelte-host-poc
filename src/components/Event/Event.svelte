<script>
    // framework tools
    import { onMount } from 'svelte'

    // import utilities     
    import { supabase } from "../../db/supabaseClient"
    import { loadEvent, loadContent } from "../../db/mockAPI"

    // import components
    import Loader from '../shared/Loader.svelte'
    import Host from "./Host/Host.svelte"
    
    // router params
    export let params = {}

    // local vars
    let activeEvent = params.id    
    let eventPromise 
    let contentPromise 

    // subscribe to DB changes, results will reload corresponding promises
    supabase
    .channel('public:countries:id=eq.'+activeEvent)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'event' }, payload => {    
        eventPromise = payload.new    
    })
    .subscribe()

    // supabase
    // .channel('public:conten:event=eq.'+activeEvent)
    // .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, payload => {    
    //     // supabase sends back granular results on trigger, so payload will only contain the row changed. Refresh list instead
    //     contentPromise = loadContent(activeEvent);
    // })
    // .subscribe()  

     //# these actions could go into a lib for cleanliness 
    let toggleGoLive = async () => {
    let event = await eventPromise;

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
    
    // load the initial data
    //# reactive statement used to update component when route params change. could use {#key} instead. or another pattern?
    //# this might change entirely with state management anyway
    $: if (activeEvent = params.id) {        
        eventPromise = loadEvent(activeEvent);
        contentPromise = loadContent(activeEvent);
    }

</script>
<!-- <h1>hello from Event {params.id}</h1> -->

{#await eventPromise}
    <Loader text="Loading Event {params.id}" />
{:then event} 
    {#if event}
        <Host {event} {contentPromise} {toggleGoLive} {setViewState} resetContentItems={() => { contentPromise = loadContent(params.id) }} />
    {:else}
        <h1>Event not found</h1>
    {/if}
{:catch error}
    <p style="color: red">{error.message}</p>    
{/await}  
