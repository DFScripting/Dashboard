<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { APIActiondumpResponse, Action, Event } from "../../api/Actiondump";

    export let actiondump: APIActiondumpResponse;

    const dispatch = createEventDispatcher<{'event': Event, 'pick': Action}>();

    let query = "";
</script>

<div class="sidebar bg-[#3b3b3b] px-2 py-2">
    <input type="text" class="border text-sm rounded-lg block w-full mb-2 p-2.5 py-1.5 bg-zinc-600 border-zinc-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search" bind:value={query}>
    <div class="palette">
        <div class="grid gap-1 categories text-white border-r border-zinc-600">
            <a class="hover:text-cyan-500 transition-colors px-3 py-0.5" href="#events">Events</a>
            <a class="hover:text-cyan-500 transition-colors px-3 py-0.5" href="#actions">Actions</a>
            <a class="hover:text-cyan-500 transition-colors px-3 py-0.5" href="#values">Client Values</a>
            <a class="hover:text-cyan-500 transition-colors px-3 py-0.5" href="#variables">Variables</a>
        </div>

        <div class="grid gap-3 overflow-x-hidden overflow-y-scroll scrollbar-none">
            <div id="events" class="px-3 py-0.5">
                <p class="text-zinc-400 uppercase font-bold text-xs">EVENTS</p>
                {#each actiondump.events as event}
                {#if event.name.toLowerCase().includes(query.toLowerCase())}
                    <span class="entryrow text-zinc-200 truncate" draggable=true on:dragstart={e => {
                        e.dataTransfer?.setData("x-dfscript-type","event")
                        e.dataTransfer?.setData("x-dfscript-identifier",event.identifier)
                    }}>
                        <img on:dragstart|preventDefault src={`/item/${event.icon.toUpperCase()}.png`} alt=""> {event.name}
                    </span>
                {/if}
                {/each}
            </div>
            <div id="actions" class="px-3 py-0.5">
                <p class="text-zinc-400 uppercase font-bold text-xs">ACTIONS</p>
                {#each actiondump.actions as action}
                {#if action.name.toLowerCase().includes(query.toLowerCase()) && !action.name.toLowerCase().includes("old")}
                    <button on:click={() => {
                        dispatch('pick',action);
                    }} class="entryrow text-zinc-200 truncate"><img on:dragstart|preventDefault src={`/item/${action.icon.toUpperCase()}.png`} alt=""> {action.name}</button>
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
        width: 24%;
        overflow: hidden;
    }

    h3 {
        font-size: 150%;
        margin-inline: auto;
    }

    .palette {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        height: 100%;
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
</style>