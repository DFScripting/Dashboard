<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { APIActiondumpResponse, Action, Event } from "../../api/Actiondump";

    export let actiondump: APIActiondumpResponse;

    const dispatch = createEventDispatcher<{'event': Event, 'pick': Action}>();

    let query = "";
</script>

<div class="sidebar">
    <input type="text" placeholder="Search" bind:value={query}>
    <div class="palette">
        <div class="categories">
            <a href="#events">Events</a>
            <a href="#actions">Actions</a>
            <a href="#values">Client Values</a>
            <a href="#variables">Variables</a>
        </div>

        <div class="list">
            <div id="events">
                <h3>EVENTS</h3>
                {#each actiondump.events as event}
                {#if event.name.toLowerCase().includes(query.toLowerCase())}
                    <span class="entryrow" draggable=true on:dragstart={e => {
                        e.dataTransfer?.setData("x-dfscript-type","event")
                        e.dataTransfer?.setData("x-dfscript-identifier",event.identifier)
                    }}>
                        <img on:dragstart|preventDefault src={`/item/${event.icon.toUpperCase()}.png`} alt=""> {event.name}
                    </span>
                {/if}
                {/each}
            </div>
            <div id="actions">
                <h3>ACTIONS</h3>
                {#each actiondump.actions as action}
                {#if action.name.toLowerCase().includes(query.toLowerCase())}
                    <button on:click={() => {
                        dispatch('pick',action);
                    }} class="entryrow"><img on:dragstart|preventDefault src={`/item/${action.icon.toUpperCase()}.png`} alt=""> {action.name}</button>
                {/if}
                {/each}
            </div>
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

    h3 {
        font-size: 150%;
        margin-inline: auto;
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
    img {
        height: 1.5em;
        padding-right: 0.3em;
    }

    input {
        text-align: center;
    }
</style>