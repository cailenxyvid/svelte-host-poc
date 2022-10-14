<script>
    export let action
</script>

<button on:click={action}>
    <i class="fa fa-plus-square" aria-hidden="true"></i>
    <slot></slot>
</button>