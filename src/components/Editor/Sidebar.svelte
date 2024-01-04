<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { APIActiondumpResponse, Action } from "../../api/Actiondump";

    export let actiondump: APIActiondumpResponse;

    const dispatch = createEventDispatcher<{'pick': Action}>();

    let query = "";
</script>

<div class="sidebar">
    <input type="text" placeholder="Search" bind:value={query}>
    <div class="palette">
        <div class="categories">
            <button>Events</button>
            <button>Actions</button>
            <button>Client Values</button>
            <button>Variables</button>
        </div>

        <div class="list">
            <div id="events">
                {#each actiondump.actions as action}
                {#if action.name.toLowerCase().includes(query.toLowerCase())}
                    <button on:click={() => {
                        dispatch('pick',action);
                    }} class="entryrow" class:hidden={!action.name.toLowerCase().includes(query.toLowerCase())}><img on:dragstart|preventDefault src={`/item/${action.icon.toUpperCase()}.png`} alt=""> {action.name}</button>
                {/if}
                {/each}
            </div>
            <div id="actions"></div>
            <div id="values"></div>
            <div id="variables"></div>
        </div>
    </div>
</div>

<style>
    .sidebar {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 18%;
        overflow: hidden;
    }

    .palette {
        display: flex;
        background-color: gray;
        flex-direction: row;
        overflow: hidden;
        height: 100%;
    }

    .list {
        overflow: scroll;
        height: 100%;
        width: 100%;
    }

    .categories {
        width: max-content;
        white-space: nowrap;
    }
    .categories, .list > * {
        display: flex;
        flex-direction: column;
    }

    .entryrow {
        display: flex;
        user-select: none;
        width: 100%;
        padding: 0.3em;
        transition: 0.5s opacity;
    }
    .hidden {
        opacity: 0.1;
    }
    img {
        height: 1.5em;
        padding-right: 0.3em;
    }

    input {
        text-align: center;
    }
</style>