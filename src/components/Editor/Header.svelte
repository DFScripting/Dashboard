<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { header, part } from "../../api/Script";
    import HandleFloater from "./HandleFloater.svelte";
    import Snippet from "./Snippet.svelte";
    import ContextMenu from "./ContextMenu.svelte";
    import { createEventDispatcher } from "svelte"
    import { getNewPart, parseSidebarDrag } from './Utility';

    export let header: header

    export let actiondump: APIActiondumpResponse;

    let dump_header = actiondump.events.find(h => h.identifier == header.event)

    let float: HandleFloater
    export function getRegion() {
        return float.getHTML().getBoundingClientRect();
    }

    const dispatcher = createEventDispatcher<{'delete':undefined}>();

    let ctx: ContextMenu;
</script>

<HandleFloater bind:this={float}>
    <div slot="head" class="header bg-cyan-500" on:contextmenu|preventDefault={ctx.open} on:dragover={e => {
        const {type} = parseSidebarDrag(e.dataTransfer);
        if(type == "action" || type == "condition") {
            e.preventDefault();
        }
    }} on:drop={e => {
        const {type,id} = parseSidebarDrag(e.dataTransfer);
        if(type == "action" || type == "condition") {
            header.snippet.parts = [
                getNewPart(type,id),
                ...header.snippet.parts
            ]
        }
    }}>
        <img on:dragstart|preventDefault src={`/item/${dump_header?.icon.toUpperCase()}.png`} alt="Icon">
        {dump_header?.name ?? header.event}
    </div>
    <Snippet slot="content" bind:snippet={header.snippet} actiondump={actiondump} />
</HandleFloater>

<ContextMenu bind:this={ctx}>
    <button on:click={() => {
        dispatcher('delete');
    }}>Delete</button>
</ContextMenu>

<style>
    .header {
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