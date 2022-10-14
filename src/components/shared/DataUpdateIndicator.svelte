<script>
    import { fade } from 'svelte/transition'    
</script>

<div transition:fade class="loader">    
    <i class="fa fa-spinner fa-pulse"></i>
</div>

<style>
    .loader {
        font-size: xx-large;
        color: green;
    }
</style>