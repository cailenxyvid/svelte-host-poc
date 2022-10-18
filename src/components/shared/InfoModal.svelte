<script>
    export let close;
</script>

<div class="modal">
    <div class="closeModal">
        <i class="fa fa-times" on:click={close}></i>
    </div>
    <slot></slot>
</div>