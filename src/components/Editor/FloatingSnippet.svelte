<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { snippet } from "../../api/Script";
    import Part from "./Part.svelte";
    import HandleFloater from "./HandleFloater.svelte";

    export let snippet: snippet;

    export let actiondump: APIActiondumpResponse

    let float : HandleFloater;
    export function onMove(e: MouseEvent) {
        return float.onMove(e);
    }
    
    console.log(snippet)
</script>

<HandleFloater bind:this={float}>
    <Part slot="head" bind:part={snippet.parts[0]} actiondump={actiondump} />
    <div slot="content">
        {#each snippet.parts as part,i}
        {#if i != 0}
        <Part bind:part={part} actiondump={actiondump} />
        {/if}
        {/each}
    </div>
</HandleFloater>