<script lang="ts">
    import Header from "./Header.svelte";

    import type { APIScriptResponse, snippet as snippet } from "../../api/Script";
    import type { APIActiondumpResponse } from "../../api/Actiondump"
    import Sidebar from "./Sidebar.svelte";
    import FloatingSnippet from "./FloatingSnippet.svelte";

    let snippetsData: snippet[] = [];
    export let script: APIScriptResponse;
    export let actiondump: APIActiondumpResponse;

    let headers: Header[] = [];
    let snippets: FloatingSnippet[] = [];

    let area: HTMLSpanElement;

    function mouseMove(ev: MouseEvent) {
        headers.forEach(el => el.onMove(ev));
        snippets.forEach((el,i) => {
            if(el == null) return;
            if(el.onMove(ev) == "FINISHED") {
                headers.forEach(header => {
                    const region = header.getRegion();
                    const inside = 
                        ((region.top < ev.clientY) && (region.bottom > ev.clientY)) &&
                        ((region.left < ev.clientX) && (region.right > ev.clientX));
                    if(inside) {
                        header.insertCode(ev,snippetsData[i].parts);
                        snippets.splice(i,1);
                        snippets = [...snippets];
                        snippetsData.splice(i,1);
                        snippetsData = [...snippetsData];
                        // snippets;
                    }
                })
            }
        });
    }
    
    
</script>

<span class="editor">
    <Sidebar actiondump={actiondump} on:pick={e => {
        // snippetsData.push({
        //     hidden: false,
        //     parts: [
        //         {
        //             action: e.detail.identifier,
        //             type: 'action',
        //             arguments: []
        //         }
        //     ]
        // })
        snippetsData = [...snippetsData, {
            hidden: false,
            parts: [
                {
                    action: e.detail.identifier,
                    type: 'action',
                    arguments: []
                }
            ]
        }];
        // snippetsData= [];
    }} />
        
    <span bind:this={area} class="area" on:mousemove={mouseMove} on:mouseup={mouseMove}>
        <button on:click={() => {
            script.headers = [...script.headers, script.headers[0]];
        }}>Pop Headers</button>
        {#each script.headers as header, i}
            <Header bind:this={headers[i]} bind:header={header} actiondump={actiondump} />
        {/each}
        {#each snippetsData as snippet, i (snippet)}
            <FloatingSnippet bind:this={snippets[i]} bind:snippet={snippetsData[i]} actiondump={actiondump} />
        {/each}
    </span>
</span>

<style>
    .editor {
        display: flex;
    }

    .editor, .area {
        width: 100%;
        height: 100%;
    }
    .area {
        overflow: scroll;
    }
</style>