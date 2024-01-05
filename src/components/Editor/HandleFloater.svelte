<script lang="ts">
    export let x = 100;
    export let y = 100;
    
    let box : HTMLDivElement;

    let dragX: number | null = null
    let dragY: number | null = null

    export const eventTypes = {
        NONE: "NONE",
        FINISH: "FINISHED",
        MOVE: "MOVE"
    } as const

    export function onMove(e: MouseEvent) {
        if(dragX != null && dragY != null) {
            if(e.buttons != 1) {
                dragX = null;
                dragY = null;
                return eventTypes.FINISH;
            }
            x = e.clientX - dragX;
            y = e.clientY - dragY;
            return eventTypes.MOVE;
        }
        return eventTypes.NONE;
    }

    let pos : HTMLDivElement;
    export function getHTML() {
        return pos;
    }
</script>

<div bind:this={pos} class="pos" style={`--x: ${x}; --y: ${y}`}>

    <div bind:this={box} class="header" 
    on:mousedown={e => {
        const bounding = box.getBoundingClientRect()
        dragX = e.clientX - bounding.x;
        dragY = e.clientY - bounding.y;
    }}
    >
<slot name="head" />
</div>
<slot name="content"/>
</div>

<style>
    .pos {
        position: absolute;
        left: calc(var(--x) * 1px);
        top: calc(var(--y) * 1px);
    }
</style>