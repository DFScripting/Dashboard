<script lang="ts">
    let box : HTMLDivElement;

    export const eventTypes = {
        NONE: "NONE",
        FINISH: "FINISHED",
        MOVE: "MOVE"
    } as const

    let pos : HTMLDivElement;
    export function getHTML() {
        return pos;
    }
</script>

<div bind:this={pos} class="float">
    <div bind:this={box} class="header" >
        <slot name="head" />
    </div>
    <slot name="content"/>
</div>

<style>
    .float {
        height: max-content;
        width: max-content;
    }
</style>