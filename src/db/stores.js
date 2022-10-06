import { writable } from 'svelte/store'

export const openPanels = writable({
    showFlowEditor: false
})