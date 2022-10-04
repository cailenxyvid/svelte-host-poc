<script>
import { supabase } from "./db/supabaseClient";

import Host from './views/Host.svelte'

let loadEvent = async () => {
  const { data, error } = await supabase
  .from('event')
  .select()
  .eq('id', 1)

  if (error) throw error;

  return data[0];
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
  
}

supabase
  .channel('*')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event' }, payload => {
    console.log('Change received!', payload)
    eventPromise = payload.new
  })
  .subscribe()

let eventPromise = loadEvent();

</script>

<main>
  {#await eventPromise}
    <h1>loading event</h1>
  {:then event} 
    <Host {event} {toggleGoLive} {setViewState} />
  {/await}
  
</main>

<style>

</style>
