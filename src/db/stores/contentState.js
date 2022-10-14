//# should this stand alone or be nested in an activeEvent store?
// this might be a use case for "derived stores" (where event is derived from more granular stores)

import { writable } from 'svelte/store'
import { supabase } from "../supabaseClient"
import { loadContent, newContentItem, deleteContentItem } from "../mockAPI"

const store = writable({
    dirty: true,
    event_id: null,
    items: [],
    errors: []
})

export const loadStore = async (event_id) => {
    let items = await loadContent(event_id)
    
    store.update(store => {
        store.dirty = false
        store.items = items
        return store;
    })  

    // subscribe to DB updates
    supabase
    .channel('public:conten:event=eq.'+event_id)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, async payload => {    
        // supabase sends back granular results on trigger, so payload will only contain the row changed. Refresh list instead (for now)
        store.update(store => {
            store.dirty = true
            return store;
        })
        let newItems = await loadContent(event_id)
        
        store.update(store => {
            store.dirty = false
            store.items = newItems
            return store;
        })  
        
    })
    .subscribe() 

}

const addItem = (item) => {
    //# do some validation and error handling - probably better to throw the error and let the consumer handle / display (?)
    newContentItem(item).catch(handleError)
}

const deleteItem = (id) => {
    //# do some validation / permissions etc 
    let t = deleteContentItem(id).catch(handleError)
}

const handleError = (error) => {
    console.error(error)
    store.update(store => {
        store.errors = [...store.errors, error]
        return store
    })
    
    // clear each error after a while. probably not the best way to do this, but good UX to do something
    setTimeout(() => {
        store.update(store => {
            store.errors = [...store.errors.slice(1,store.errors.length)]
            return store
        })  
    }, 5000)
}

export const contentStore = {
    subscribe: store.subscribe,
    set: store.set,
    addItem: addItem,
    deleteItem: deleteItem
}