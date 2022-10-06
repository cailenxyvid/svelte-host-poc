<script>
  // import utilities 
  import { supabase } from "./db/supabaseClient";

  // import components
  import Host from './views/Host.svelte'

let loadEvent = async () => {
  const { data, error } = await supabase
  .from('event')
  .select()
  .eq('id', 1)

  if (error) throw error;

  return data[0];
}

let loadContent = async () => {
  const { data, error } = await supabase
  .from('content')
  .select()
  .eq('event_id', 1)
  .order('id')

  if (error) throw error;

  return data;
}

let toggleGoLive = async () => {
  let event = await eventPromise;

  const { data, error } = await supabase
  .from('event')
  .update({ live: !event.live })
  .match({ id: 1 })

  if (error) throw error

  // no further action required since the DB subscription takes over
}

let setViewState = async (vs) => {  
  const { data, error } = await supabase
  .from('event')
  .update({ viewstate: vs })
  .match({ id: 1 })

  if (error) throw error

  return data; // we don't need the data, but this returns a promise we can await on 
}

// subscribe to DB changes, results will reload corresponding promises
supabase
  .channel('supabase_realtime')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'event' }, payload => {    
    eventPromise = payload.new    
  })
  .subscribe()

supabase
  .channel('*')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, payload => {    
    // supabase sends back granular results on trigger, so payload will only contain the row changed. Refresh list instead
    contentPromise = loadContent();
  })
  .subscribe()  

// load the initial data
let eventPromise = loadEvent();
let contentPromise = loadContent();

</script>

<main>
  {#await eventPromise}
    <h1>loading event</h1>
  {:then event} 
    <Host {event} {contentPromise} {toggleGoLive} {setViewState} resetContentItems={() => { contentPromise = loadContent() }} />
  {/await}  
</main>