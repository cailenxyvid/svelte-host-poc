<script>
    import { updateEvent } from '../../db/mockAPI'
    export let event;

    let toggleRoomOpen = () => {
        event.open = !event.open
        updateEvent(event)
    }

    let toggleRecording = () => {
        event.recording = !event.recording
        updateEvent(event)
    }
</script>

<span class="p1 text-xl">
    <i on:click={toggleRoomOpen} class="fa-solid fa-lock{event.open ? '-open text-xyvid-green' : ''}"
        title="{event.open ? 'Close' : 'Open'} room"></i>
    <i on:click={toggleRecording} 
        class="fa-solid fa-circle-video {event.recording ? 'text-red-600' : '' }" 
        title="{event.recording ? 'Stop' : 'Start'} recording"></i>
    <span id="EncoderStatusWidget" class="bg-slate-300 rounded-full">
        <i class="fa-solid fa-circle"></i>
        {#if event.encoder_status == 'offline'}
        <i class="fa-solid fa-circle shadow-lg shadow-red-400 text-red-800 fa-beat" title="Encoder OFFLINE"></i>
        {:else}
        <i class="fa-solid fa-circle text-green-600" title="Encoder Stable"></i>
        {/if}
    </span>
</span>