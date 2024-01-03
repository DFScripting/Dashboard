<script lang="ts">
    import Header from "./header.svelte";

    import type { APIScriptResponse } from "../../api/Script";
    import type { APIActiondumpResponse } from "../../api/Actiondump"
    import Sidebar from "./sidebar.svelte";

    export let script: APIScriptResponse;
    export let actiondump: APIActiondumpResponse;

    let movables: Header[] = [];
</script>

<span class="editor">
    <Sidebar actiondump={actiondump} />
    <span class="area" on:mousemove={ev => {
            movables.forEach(el => el.onMove(ev));
        }}>
        {#each script.headers as header, i}
        <Header bind:this={movables[i]} bind:header={header} actiondump={actiondump} />
        {/each}
        <span class=".verytall"></span>
    </span>
</span>

<style>
    .area {
        overflow: scroll;
        width: 100%;
        height: 100%;
    }
</style>