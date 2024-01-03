<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";

    export let actiondump: APIActiondumpResponse;

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
                        <span class="entryrow"><img on:dragstart|preventDefault src={`/item/${action.icon.toUpperCase()}.png`} alt=""> {action.name}</span>
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
        display: grid;
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
    }
    img {
        height: 1.5em;
        padding-right: 0.3em;
    }
</style>