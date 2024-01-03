<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { APIScriptResponse } from "../../api/Script";
    import Part from "./part.svelte";

    export let snippet: APIScriptResponse['headers'][number]['snippet'];

    export let actiondump: APIActiondumpResponse
</script>

<div>
    {#each snippet.parts as part,i}
        <Part bind:part={part} actiondump={actiondump} />
    {/each}
</div>