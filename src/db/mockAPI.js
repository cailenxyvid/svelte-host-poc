import { supabase } from "./supabaseClient";

export const newContentItem = async (item) => {
    const { data, error } = await supabase
        .from('content')
        .insert([
            { title: item.title, event_id: 1 }
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