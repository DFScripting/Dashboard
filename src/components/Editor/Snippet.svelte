<script lang="ts">
    import type { APIActiondumpResponse } from "../../api/Actiondump";
    import type { snippet } from "../../api/Script";
    import Part from "./Part.svelte";

    export let snippet: snippet;

    export let actiondump: APIActiondumpResponse
</script>

<div class="snippet">
    {#each snippet.parts as part,i}
        <Part bind:part={part} actiondump={actiondump} />
    {/each}
</div>

<style>
    .snippet {
        width: max-content;
    }
</style>