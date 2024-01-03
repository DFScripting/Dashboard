<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { APIScriptResponse } from "../../api/Script";
    import Snippet from "./snippet.svelte";

    export let header: APIScriptResponse['headers'][number]

    export let x = 100;
    export let y = 100;

    export let actiondump: APIActiondumpResponse;

    let dump_header = actiondump.events.find(h => h.identifier == header.event)

    let box : HTMLDivElement;

    let dragX: number | null = null
    let dragY: number | null = null

    export function onMove(e: MouseEvent) {
        if(dragX != null && dragY != null) {
            x = e.clientX - dragX;
            y = e.clientY - dragY;
        }
    }
</script>

<div class="pos" style={`--x: ${x}; --y: ${y}`}>

    <div bind:this={box} class="header" 
    on:mousedown={e => {
        const bounding = box.getBoundingClientRect()
        dragX = e.clientX - bounding.x;
        dragY = e.clientY - bounding.y;
    }}
on:mouseup={() => {dragX = null; dragY = null}}
>
<img on:dragstart|preventDefault src={`/item/${dump_header?.icon.toUpperCase()}.png`} alt="Icon"> {dump_header?.name ?? header.event}
</div>
<Snippet bind:snippet={header.snippet} actiondump={actiondump} />
</div>


<style>
    .pos {
        position: absolute;
        left: calc(var(--x) * 1px);
        top: calc(var(--y) * 1px);
    }

    .header {
        background-color: aqua;
        padding: 1em;
        border-radius: 1em 1em 0 0;
        user-select: none;
        display: flex;
    }

    img {
        height: 1.5em;
        margin-right: 0.5em;
        user-select: none;
    }
</style>