<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { header, part } from "../../api/Script";
    import HandleFloater from "./HandleFloater.svelte";
    import Snippet from "./Snippet.svelte";

    export let header: header

    export let actiondump: APIActiondumpResponse;

    let dump_header = actiondump.events.find(h => h.identifier == header.event)

    let float: HandleFloater
    export function getRegion() {
        return float.getHTML().getBoundingClientRect();
    }

    export function insertCode(event: MouseEvent, code: part[]) {
        header.snippet.parts.push(...code);
        header = header
    }
</script>

<HandleFloater bind:this={float}>
    <div slot="head" class="header">
        <img on:dragstart|preventDefault src={`/item/${dump_header?.icon.toUpperCase()}.png`} alt="Icon">
        {dump_header?.name ?? header.event}
    </div>
    <Snippet slot="content" bind:snippet={header.snippet} actiondump={actiondump} />
</HandleFloater>


<style>
    .header {
        background-color: aqua;
        padding: 1em;
        border-radius: 1em 1em 0 0;
        user-select: none;
        display: flex;
        width: max-content;
    }

    img {
        height: 1.5em;
        margin-right: 0.5em;
        user-select: none;
    }
</style>