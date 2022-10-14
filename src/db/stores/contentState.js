//# should this stand alone or be nested in an activeEvent store?
// this might be a use case for "derived stores" (where event is derived from more granular stores)

import { writable } from 'svelte/store'
import { supabase } from "../supabaseClient"
import { loadContent } from "../mockAPI"

const store = writable({
    dirty: true,
    event_id: null,
    items: []
})

// only directly expose create function - returns custom store with actions and data
// we need event_id to populate data and subscribe to DB, so we only create a store when explicitly called 
export const loadStore = async (event_id) => {
    let items = await loadContent(event_id)
    store.set({dirty: false, event_id: event_id, items: items})

    // subscribe to DB updates
    supabase
    .channel('public:conten:event=eq.'+event_id)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, async payload => {    
        // supabase sends back granular results on trigger, so payload will only contain the row changed. Refresh list instead
        let newItems = await loadContent(event_id)
        store.set({dirty: false, event_id: event_id, items: newItems})
        console.log('db change detected for content items')
    })
    .subscribe() 

}

const setEvent = (event_id) => {
    //# this is probably bad. the store should be destroyed and recreated when changing events (?)
}

const addItem = (item) => {
    console.log('contentStore setOne')
}

export const contentStore = {
    subscribe: store.subscribe,
    addItem: addItem
}