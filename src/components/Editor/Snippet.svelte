<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { snippet } from "../../api/Script";
    import Part from "./Part.svelte";
    import { getNewPart, parseSidebarDrag } from "./Utility";

    export let snippet: snippet;

    export let actiondump: APIActiondumpResponse;

    let parts: (Part|null)[] = []
</script>

<div class="snippet" on:dragover|stopPropagation={e => {
    const {type} = parseSidebarDrag(e.dataTransfer);
    if(type == 'action' || type == 'condition') {
        e.preventDefault();
    }
}} on:drop|stopPropagation={e => {
    const {type,id} = parseSidebarDrag(e.dataTransfer);
    if(type == 'action' || type == 'condition') {
        const add = getNewPart(type,id);
        let i = 0;
        parts.forEach(x => {
            if(x == null) return;
            const region = x.getRegion();
            if(region.y + region.height / 2 < e.clientY) {
                i++;
            }
        });
        snippet.parts.splice(i,0,add);
        snippet.parts = snippet.parts;
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