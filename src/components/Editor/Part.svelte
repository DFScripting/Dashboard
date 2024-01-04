<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { part } from "../../api/Script";
    import Argument from "./Argument.svelte";

    export let part: part;

    export let actiondump: APIActiondumpResponse

    let dump_part = actiondump.actions.find(a => part.action == a.identifier);
</script>

<div class="part">
    <img on:dragstart|preventDefault src={`/item/${dump_part?.icon.toUpperCase()}.png`} alt="Icon">
    <span>
        {dump_part?.name ?? part.action}
    </span>
    {#each part.arguments as argument}
    <span>
        <Argument bind:argument={argument} /> 
    </span>
    {/each}
</div>

<style>
    .part > * {
        margin: auto;
        margin-left: 0.4em;
    }
    .part > *:first-child {
        margin-left: 0;
    }
    .part {
        padding: 1em;
        background-color: grey;
        display: flex;
        user-select: none;
    }
    img {
        height: 1.5em;
        margin-right: 0.5em;
        user-select: none;
    }
</style>