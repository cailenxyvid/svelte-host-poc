import { supabase } from "./supabaseClient";

// ******** content
export const newContentItem = async (item) => {
    const { data, error } = await supabase
        .from('content')
        .insert([
            { title: item.title, event_id: item.event_id }
        ])

    if (error) {
        console.error("Error creating content item", error)
        throw new Error("Unable to add new content item!")        
    }

    return data;
}

export const deleteContentItem = async (id) => {
    const { status, error } = await supabase
        .from('content')
        .delete()
        .match({ id: id })

    if (error) {
        console.error("Error deleting content item", error)
        throw new Error("Unable to delete content item ("+id+")!")        
    }
    
    return status;
}

export const updateContentItem = async (item) => {
    const { data, error } = await supabase
        .from('content')
        .update(item)
        .match({ id: item.id })

    if (error) {
        console.error("Error updating content item", error)
        throw new Error("Unable to update content item ("+item.title+")!")        
    }

    return data;
}

export let loadContent = async (event_id) => {
    const { data, error } = await supabase
    .from('content')
    .select()
    .eq('event_id', event_id)
    .order('id', { ascending: true })
    
  
    if (error) throw error;
  
    return data;
  }

// ******** events / event
export let loadEvents = async () => {
    const { data, error } = await supabase
    .from('event')
    .select()

    if (error) throw error;

    return data;
}

export let loadEvent = async (event_id) => {
    const { data, error } = await supabase
    .from('event')
    .select()
    .eq('id', event_id)
  
    if (error) return error;
  
    return data[0];
  }
  
  export const updateEvent = async (event) => {
    const { data, error } = await supabase
        .from('event')
        .update(event)
        .match({ id: event.id })

    if (error) {
        console.error("Error updating content item", error)
        throw new Error("Unable to update event ("+event.title+")!")        
    }

    return data;
}  