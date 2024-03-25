<script lang="ts">
    import type { APIScriptResponse, snippet as snippet } from "../../api/Script";
    import type { APIActiondumpResponse } from "../../api/Actiondump"
    import Sidebar from "./Sidebar.svelte";
    import Header from "./Header.svelte";
    
    export let script: APIScriptResponse;
    export let actiondump: APIActiondumpResponse;

    let headers: (Header|null)[] = [];
    let area: HTMLSpanElement;

    export function save() {
        console.log(script.headers)
        const parts = document.cookie.split(`; access_token=`);
        if (parts.length != 2) return;

        let header = new Headers();
        header.append('X-Token', parts[1].split(";")[0]);
        header.append('X-Id', String(script.id));
        header.append('X-Headers', encodeURIComponent(JSON.stringify(script.headers)));

        fetch('https://api.techstreet.tech/dfscript/web/script/save/', {
		    headers: header
        }).then(res => {
            location.href = "/"
        });

    }
</script>

<span class="flex w-full h-full" on:contextmenu|preventDefault>
    <Sidebar actiondump={actiondump} save={save} />
    <span bind:this={area} class="area" on:dragover={e => {
        if(e.dataTransfer?.getData("x-dfscript-type") == "event") {
            e.preventDefault();
        }
    }} on:drop={e => {
        if(e.dataTransfer?.getData("x-dfscript-type") == "event") {
            let i = 0;
            headers.forEach(x => {
                if(x == null) return;
                const region = x.getRegion();
                if(region.x + region.width / 2 < e.clientX) {
                    i++;
                }
            });
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