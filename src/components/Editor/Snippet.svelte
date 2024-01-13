<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { snippet } from "../../api/Script";
    import Part from "./Part.svelte";
    import { getNewPart, parseSidebarDrag } from "./Utility";

    export let snippet: snippet;

    export let actiondump: APIActiondumpResponse;

    let parts: Part[] = []
</script>

<div class="snippet" on:dragover={e => {
    const {type} = parseSidebarDrag(e.dataTransfer);
    if(type == 'action' || type == 'condition') {
        e.preventDefault();
    }
}} on:drop={e => {
    const {type,id} = parseSidebarDrag(e.dataTransfer);
    if(type == 'action' || type == 'condition') {
        const add = getNewPart(type,id);
        let i = 0;
        for (const part of parts) {
            if(e.clientY > part.getRegion().bottom) break;
            // TODO: gonna leave this code here, this is for getting the index to insert into. checking if the mouse is below the boundry of each child
        }
    }
}}>
    {#each snippet.parts as part,i (part)}
        <Part bind:part={part} bind:this={parts[i]} actiondump={actiondump} on:delete={() => {
            snippet.parts.splice(i,1);
            snippet.parts = snippet.parts;
            parts = parts.filter(x => x);
        }} />
    {/each}
</div>

<style>
    .snippet {
        width: max-content;
    }
</style>