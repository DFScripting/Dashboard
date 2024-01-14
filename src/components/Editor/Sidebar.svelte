<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { APIActiondumpResponse, Action, Event } from "../../api/Actiondump";
    import { sideData } from "./Utility"

    export let actiondump: APIActiondumpResponse;

    let open = true

    let query = "";
</script>

<div class="box" class:open>
<div class="sidebar bg-[#3b3b3b] px-3 py-3" class:open>
    <input type="text" class="border text-sm rounded-lg block w-full mb-2 p-2.5 py-1.5 bg-zinc-600 border-zinc-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search" bind:value={query}>
    <div class="palette">
        <div class="grid gap-1 categories text-white border-r border-zinc-600">
            <a href="#events">Events</a>
            <a href="#actions">Actions</a>
            <a href="#values">Client Values</a>
            <a href="#conditions">Conditions</a>
            <a href="#variables">Variables</a>
            <a href="#functions">Functions</a>
        </div>

        <div class="grid gap-3 overflow-x-hidden overflow-y-scroll scrollbar-none">
            <div id="events" class="px-3 py-0.5">
                <p class="text-zinc-400 uppercase font-bold text-xs">EVENTS</p>
                {#each actiondump.events as event}
                {#if event.name.toLowerCase().includes(query.toLowerCase())}
                    <span class="entryrow text-zinc-200 truncate" draggable=true on:dragstart={sideData('event',event.identifier)}>
                        <img on:dragstart|preventDefault src={`/item/${event.icon.toUpperCase()}.png`} alt=""> {event.name}
                    </span>
                {/if}
                {/each}
            </div>
            <div id="actions" class="px-3 py-0.5">
                <p class="text-zinc-400 uppercase font-bold text-xs">ACTIONS</p>
                {#each actiondump.actions as action}
                {#if action.name.toLowerCase().includes(query.toLowerCase()) && !action.name.toLowerCase().includes("old")}
                    <span class="entryrow text-zinc-200 truncate" draggable="true" on:dragstart={sideData('action',action.identifier)}>
                        <img on:dragstart|preventDefault src={`/item/${action.icon.toUpperCase()}.png`} alt=""> {action.name}
                    </span>
                {/if}
                {/each}
            </div>
            <div id="values" class="px-3 py-0.5">
                <p class="text-zinc-400 uppercase font-bold text-xs">CLIENT VALUES</p>
                {#each actiondump.client_values as value}
                {#if value.name.toLowerCase().includes(query.toLowerCase()) && !value.name.toLowerCase().includes("old")}
                    <span class="entryrow text-zinc-200 truncate" draggable="true" on:dragstart={sideData('value',value.identifier)}>
                        <img on:dragstart|preventDefault src={`/item/${value.icon.toUpperCase()}.png`} alt=""> {value.name}
                    </span>
                {/if}
                {/each}
            </div>
            <div id="conditions" class="px-3 py-0.5">
                <p class="text-zinc-400 uppercase font-bold text-xs">CONDITIONS</p>
                {#each actiondump.conditions as condition}
                {#if condition.name.toLowerCase().includes(query.toLowerCase()) && !condition.name.toLowerCase().includes("old")}
                    <span class="entryrow text-zinc-200 truncate" draggable="true" on:dragstart={sideData('condition',condition.identifier)}>
                        <img on:dragstart|preventDefault src={`/item/${condition.icon.toUpperCase()}.png`} alt=""> {condition.name}
                    </span>
                {/if}
                {/each}
            </div>
            <div id="variables" class="px-3 py-0.5">
                <p class="text-zinc-400 uppercase font-bold text-xs">MY VARIABLES</p>
                <button class="add">Add Variable</button>
            </div>
            <div id="functions" class="px-3 py-0.5">
                <p class="text-zinc-400 uppercase font-bold text-xs">MY FUNCTIONS</p>
                <button class="add">Add Function</button>
            </div>
        </div>
    </div>
</div>
<button class="bg-[#3b3b3b] text-white text-xl h-fit rounded-br-lg" on:click={() => open = !open}>
    <span class="px-2 hover:text-cyan rounded-lg hover:bg-sky-700">{open ? "«" : "»"}</span>
</button>
</div>


<style>
    .box {
        transition: width 500ms ease-in-out;
        width: 3%;
    }
    .box.open {
        width: 27%;
    }
    .box, .sidebar {
        display: flex;
        height: 100%;
        overflow: hidden;
    }
    .sidebar {
        transition: width 500ms ease-in-out;
        flex-direction: column;
        width: 0%;
    }
    .sidebar * {
        opacity: 0;
        transition: opacity 500ms ease-in-out;
    }
    .sidebar.open * {
        opacity: 1;
    }
    .sidebar.open {
        width: 100%;
    }

    .add {
        font-size: small;
        background-color: #222;
        padding: 0.2em;
        color: white;
    }

    .palette {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        height: 100%;
    }
    .palette div a {
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        transition: color 150ms;
    }
    .palette div a:hover {
        color: #06b6d4;
    }

    .categories {
        width: max-content;
        white-space: nowrap;
    }
    .categories {
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