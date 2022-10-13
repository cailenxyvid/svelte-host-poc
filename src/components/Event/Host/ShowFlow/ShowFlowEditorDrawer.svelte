<script>
    import { openPanels } from '../../../../db/stores.js'
</script>

<div class="showFlowEditorDrawer">
    <span><i class="fa fa-outdent" aria-hidden="true"></i></span>
    <span><i class="fa fa-list" aria-hidden="true"></i></span>
    <span><i class="fa fa-circle" aria-hidden="true"></i></span>
    <span on:click={ () => { $openPanels.showFlowEditor = !$openPanels.showFlowEditor } }><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
</div>