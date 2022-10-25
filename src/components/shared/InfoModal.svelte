<script>
    export let close;
</script>

<div class="modal absolute w-2/4 h-2/4 m-auto items-center bg-slate-400">
    <div class="closeModal">
        <i class="fa fa-times" on:click={close}></i>
    </div>
    <slot></slot>
</div>