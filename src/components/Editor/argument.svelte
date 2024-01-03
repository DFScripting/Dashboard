<script lang="ts">
    import type { APIScriptResponse } from "../../api/Script";

    export let argument: APIScriptResponse['headers'][number]['snippet']['parts'][number]['arguments'][number];
</script>

<div class:argument class={argument.type.toLowerCase()}>
    <input type="text" bind:value={argument.value}>
</div>

<style>
    .argument {
        padding: 0.2em 0.5em;
        font-size: 90%;
        background-color: white;
    }

    .text {
        border-radius: 5em;
    }

    input {
        border: none;
        background: none;
        padding: 0;
        margin: none;
        outline: none;
    }
    input:focus {
        outline: none !important;
        box-shadow: none !important;
    }
</style>