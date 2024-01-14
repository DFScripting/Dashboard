<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { actionPart, branchPart, part } from "../../api/Script";
    import Snippet from './Snippet.svelte';
    import { createEventDispatcher } from "svelte";
    import ContextMenu from "./ContextMenu.svelte";
    import { parseSidebarDrag, getNewPart } from "./Utility";
    import Arguments from "./Arguments.svelte"

    export let part: part;

    export let actiondump: APIActiondumpResponse

    function getType() {
        switch(part.type){
            case 'action': return actiondump.actions.find(a => (part as actionPart).action == a.identifier)
            case 'branch': return actiondump.conditions.find(c => (part as branchPart).condition.condition == c.identifier)
        }
    }

    let box: HTMLDivElement;
    let showCtx = false;
    export function getRegion() {
        return box.getBoundingClientRect();
    }

    const dispatcher = createEventDispatcher<{'delete':undefined}>();
    let ctx : ContextMenu;
    let dump_part = getType();
</script>

<ContextMenu bind:this={ctx} bind:show={showCtx}>
    <button on:click={() => {dispatcher('delete')}}>Delete</button>
</ContextMenu>
<div class={`part ${part.type}`} class:showCtx on:contextmenu|stopPropagation|preventDefault={ctx.open} bind:this={box}>
    {#if part.type == 'action'}
        <div class="row">
            <img on:dragstart|preventDefault src={`/item/${dump_part?.icon.toUpperCase()}.png`} alt="Icon">
            <span>
                {dump_part?.name ?? part.action}
            </span>
            <Arguments bind:args={part.arguments} actiondump={actiondump} />
        </div>
    {:else if part.type == 'branch'}
    <div class="row">
        <img on:dragstart|preventDefault src={`/item/${dump_part?.icon.toUpperCase()}.png`} alt="Icon">
        <span>
            {dump_part?.name ?? part.condition.condition}
        </span>
        <Arguments bind:args={part.arguments} actiondump={actiondump} />
    </div>
        <div class="container" on:dragover|stopPropagation={e => {
            const {type} = parseSidebarDrag(e.dataTransfer);
            if(type == 'action' || type == 'condition') {
                e.preventDefault();
            }
        }} on:drop|stopPropagation={e => {
            const {type,id} = parseSidebarDrag(e.dataTransfer);
            if(type == 'action' || type == 'condition') {
                if(part.type != 'branch') return;
                part.true.parts = [...part.true.parts, getNewPart(type,id)];
            }
        }}>
            <Snippet snippet={part.true} actiondump={actiondump} />
            {#if part.false}
                <Snippet snippet={part.false} actiondump={actiondump} />
            {/if}
        </div>
    {/if}
</div>
<span class={`joiner ${part.type}`}>

</span>

<style>
    .row > * {
        margin-block: auto;
    }
    .row {
        display: flex;
        user-select: none;
        margin-block: auto;
        gap: 1em;
    }
    .container {
        min-height: 3em;
        min-width: 5em;
        background-color: #444;
    }
    .showCtx {
        outline: 3px solid red;
    }
    .part {
        display: flex;
        flex-direction: column;
        padding: 1em;
        gap: 1em;
        width: fit-content;
    }
    .action {
        background-color: #555;
    }
    .branch {
        background-color: #862;
    }
    /* .joiner {
        position: absolute;
        width: 3em;
        border-bottom-right-radius: 1em;
        border-bottom-left-radius: 1em;
        height: 1em;
    } */
    img {
        height: 1.5em;
        margin-right: 0.5em;
        user-select: none;
    }
</style>