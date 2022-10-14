<script>
    import { fly } from "svelte/transition"

    export let error
</script>

<div transition:fly={{ duration: 1500 }}>{error}</div>