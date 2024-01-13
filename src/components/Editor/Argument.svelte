<script lang="ts">
    import { type Argument, ArgumentTypes } from "../../api/Actiondump";
    import type { argument } from "../../api/Script";

    export let argument: Argument;
    export let value: argument|undefined = undefined;

    let input: HTMLInputElement;
</script>

<div class:argument class={argument.type.toLowerCase()}>
    <img class="type" src={`/item/${argument.type_icon.toUpperCase()}.png`} alt={argument.type_name} title={`[${argument.type_name}] ${argument.name}` }>
    <div class="content">
        {#if value == undefined}
            <button title="Use Variable" class="add" on:click={() => {
                value = {
                    type: 'VARIABLE',
                    value: '',
                }
            }}>
            <img src={`/item/${ArgumentTypes.VARIABLE.icon.toUpperCase()}.png`} alt="Variable">
        </button>
        {#if argument.type == 'NUMBER' || argument.type == 'TEXT' || argument.type == 'BOOL'}
            <button title="Add Literal" class="add" on:click={() => {
                value = {type:argument.type,value:''}
            }}><img src={`/item/${argument.type_icon.toUpperCase()}.png`} alt={argument.type_name}></button>
        {/if}
        {:else}
            {#if value.type == 'TEXT' || value.type == 'VARIABLE'}
                <!-- {#if value.type == 'VARIABLE'}
                    <select>
                        <option value="SCRIPT">Script</option>
                    </select>
                {/if} -->
                <input bind:this={input} type="text">
            {/if}
            {#if value.type == 'NUMBER'}
                <input bind:this={input} type="number">
            {/if}
        {/if}
    </div>
</div>

<style>
    .argument {
        display: flex;
        gap: 0.2em;
    }

    /* .any {}
    .number {}
    .text {}
    .list {}
    .dictionary {}
    .bool {}
    .variable {} */

    .content {
        padding: 0.2em;
        font-size: 90%;
        background-color: white;
        height: 1.9em;
    }

    img.type {
        margin-block-start: auto;
        margin-block: auto;
    }
    img {
        height: 1.5em;
    }

    .text {
        border-radius: 5em;
    }

    .add {
        width: 1.5em;
        border-radius: 100%;
        background-color: #ccc;
        outline: 1px solid black;
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