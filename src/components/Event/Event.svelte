<script>
    // import utilities     
    import { supabase } from "../../db/supabaseClient";
    import { loadEvent, loadContent } from "../../db/mockAPI";

    // import components
    import Host from "../Host/Host.svelte"
    
    // router params
    export let params = {}

    // local vars
    let activeEvent = params.id

    // subscribe to DB changes, results will reload corresponding promises
    supabase
    .channel('public:countries:id=eq.'+activeEvent)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'event' }, payload => {    
        eventPromise = payload.new    
    })
    .subscribe()

    supabase
    .channel('public:conten:event=eq.'+activeEvent)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, payload => {    
        // supabase sends back granular results on trigger, so payload will only contain the row changed. Refresh list instead
        contentPromise = loadContent(activeEvent);
    })
    .subscribe()  

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
    let eventPromise = loadEvent(activeEvent);
    let contentPromise = loadContent(activeEvent);


</script>
<h1>hello from Event {params.id}</h1>

{#await eventPromise}
<h1>loading event</h1>
{:then event} 
<Host {event} {contentPromise} {toggleGoLive} {setViewState} resetContentItems={() => { contentPromise = loadContent(params.id) }} />
{/await}  