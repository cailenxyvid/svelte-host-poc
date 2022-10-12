import { supabase } from "./supabaseClient";

export const newContentItem = async (item) => {
    const { data, error } = await supabase
        .from('content')
        .insert([
            { title: item.title, event_id: item.event_id }
        ])

    if (error) throw error

    return data;
}

export const deleteContentItem = async (id) => {
    const { data, error } = await supabase
        .from('content')
        .delete()
        .match({ id: id })

    if (error) throw error

    return data;
}

export const updateContentItem = async (item) => {
    const { data, error } = await supabase
        .from('content')
        .update(item)
        .match({ id: item.id })

    if (error) throw error

    return data;
}

export let loadEvent = async (event_id) => {
    const { data, error } = await supabase
    .from('event')
    .select()
    .eq('id', event_id)
  
    if (error) throw error;
  
    return data[0];
  }
  
  export let loadContent = async (event_id) => {
    const { data, error } = await supabase
    .from('content')
    .select()
    .eq('event_id', event_id)
    .order('active', { ascending: false })
    
  
    if (error) throw error;
  
    return data;
  }