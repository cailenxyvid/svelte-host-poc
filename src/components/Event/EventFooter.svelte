<script>
    import { scale } from "svelte/transition"

    let openTechSupport = false
    let openChat = false
</script>

<div class="relative">
{#if openTechSupport}
<div class="h-40 w-60 absolute left-20 bottom-0 border rounded-md bg-slate-400">
    <h3>Tech Support Chat Pane</h3>
</div>
{/if}

{#if openChat}
<div class="h-40 w-60 absolute left-60 bottom-0 border rounded-md bg-slate-400">
    <h3>Event Chat Pane</h3>
</div>
{/if}
</div>
<footer class="container justify-between bg-slate-800 p-2 pl-20 text-xl text-white">
    <i on:click={() => { openTechSupport = !openTechSupport }} class="fa-regular fa-comments-question-check" title="Tech Support"></i>
    <i on:click={() => { openChat = !openChat }} class="fa-regular fa-comment-dots" title="Audience Chat"></i>
    <i class="fa-solid fa-chart-line" title="infographic/ticker with event stats, engagement numbers etc"></i>
</footer>