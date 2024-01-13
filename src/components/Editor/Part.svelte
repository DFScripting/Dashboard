<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { actionPart, branchPart, part } from "../../api/Script";
    import Snippet from './Snippet.svelte';
    import Argument from "./Argument.svelte";
    import { createEventDispatcher } from "svelte";
    import ContextMenu from "./ContextMenu.svelte";

    export let part: part;

    export let actiondump: APIActiondumpResponse

    function getType() {
        switch(part.type){
            case 'action': return actiondump.actions.find(a => (part as actionPart).action == a.identifier)
            case 'branch': return actiondump.conditions.find(c => (part as branchPart).condition.condition == c.identifier)
        }
    }

    let box: HTMLDivElement;
    export function getRegion() {
        return box.getHTML().getBoundingClientRect();
    }

    const dispatcher = createEventDispatcher<{'delete':undefined}>();
    let ctx : ContextMenu;
    let dump_part = getType();
</script>

<ContextMenu bind:this={ctx}>
    <button on:click={() => {dispatcher('delete')}}>Delete</button>
</ContextMenu>
<div class={`part ${part.type}`} on:contextmenu|stopPropagation|preventDefault={ctx.open} bind:this={box}>
    {#if part.type == 'action'}
        <div class="row">
            <img on:dragstart|preventDefault src={`/item/${dump_part?.icon.toUpperCase()}.png`} alt="Icon">
            <span>
                {dump_part?.name ?? part.action}
            </span>
            {#if dump_part}
                {#each dump_part.arguments as argument}
                    <Argument argument={argument} />
                {/each}
            {/if}
        </div>
    {:else if part.type == 'branch'}
    <div class="row">
        <img on:dragstart|preventDefault src={`/item/${dump_part?.icon.toUpperCase()}.png`} alt="Icon">
        <span>
            {dump_part?.name ?? part.condition.condition}
        </span>
        {#if dump_part}
            {#each dump_part.arguments as argument}
            <span>
                <Argument bind:argument={argument} /> 
            </span>
            {/each}
        {/if}
    </div>
        <div class="container">
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
        padding-inline: 1em;
    }
    .part {
        display: flex;
        flex-direction: column;
        padding: 1em;
        gap: 1em;
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