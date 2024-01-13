<script lang="ts">
    import type { APIScriptResponse, snippet as snippet } from "../../api/Script";
    import type { APIActiondumpResponse } from "../../api/Actiondump"
    import Sidebar from "./Sidebar.svelte";
    import Header from "./Header.svelte";
    import Snippet from "./Snippet.svelte";
    
    export let script: APIScriptResponse;
    export let actiondump: APIActiondumpResponse;

    let headers: Header[] = [];
    let area: HTMLSpanElement;

    console.log(script);
</script>

<span class="flex w-full h-full" on:contextmenu|preventDefault>
    <Sidebar actiondump={actiondump} />
    <span bind:this={area} class="area" on:dragover={e => {
        if(e.dataTransfer?.getData("x-dfscript-type") == "event") {
            e.preventDefault();
        }
    }} on:drop={e => {
        if(e.dataTransfer?.getData("x-dfscript-type") == "event") {
            let i = 0;
            headers.forEach(x => {
                if(x.getRegion().x + x.getRegion().width / 2 < e.clientX) {
                    i++;
                }
            })
            console.log(i);
            script.headers.splice(i,0,{
                event: e.dataTransfer.getData("x-dfscript-identifier"),
                snippet: {
                    hidden: false,
                    parts: [],
                },
                type: "event"
            })
            script.headers = [...script.headers]
        }
    }}>
        {#each script.headers as header, i (header)}
            <Header bind:this={headers[i]} bind:header={script.headers[i]} actiondump={actiondump} on:delete={() => {
                script.headers.splice(i,1);
                script.headers = script.headers;
                setTimeout(() => {
                    headers = headers.filter(x => x); // removing stuff can add nulls so clear them out
                })
            }} />
        {/each}
    </span>
</span>

<style>
    .area {
        width: 100%;
        height: 100%;
        padding: 3em;
        overflow: scroll;
        display: flex;
        gap: 3em;
    }
</style>