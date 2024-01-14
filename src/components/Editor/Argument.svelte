<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { type Argument } from "../../api/Actiondump";
    import { type argument, ArgumentTypes } from "../../api/Script";

    export let argument: argument;
    const type = ArgumentTypes[argument.type];

    const dispatcher = createEventDispatcher<{delete:undefined}>();

    let input: HTMLInputElement;
</script>

<div class:argument class={argument.type.toLowerCase()}>
    <img class="type" src={`/item/${type.icon.toUpperCase()}.png`} alt={type.name} title={type.name}>
    <div class="content">
        <!-- {#if value == undefined}
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
        {:else} -->
            {#if argument.type == 'TEXT' || argument.type == 'VARIABLE'}
                <!-- {#if value.type == 'VARIABLE'}
                    <select>
                        <option value="SCRIPT">Script</option>
                    </select>
                {/if} -->
                <input bind:this={input} bind:value={argument.value} type="text">
            {/if}
            {#if argument.type == 'NUMBER'}
                <input bind:this={input} bind:value={argument.value} type="number">
            {/if}
            {#if argument.type == 'BOOL'}
                <input bind:this={input} bind:checked={argument.value} type="checkbox" />
            {/if}
        <!-- {/if} -->
    </div>
    <button class="delete" on:click={() => dispatcher('delete')}>X</button>
</div>

<style>
    .argument {
        display: flex;
        height: 1.7em;
    }
    .content {
        padding: 0.2em;
        font-size: 90%;
        background-color: white;
        outline: 1px solid black;
        display: flex;
    }

    img.type {
        margin-block-start: auto;
        margin-block: auto;
    }
    img {
        height: 100%;
        padding-inline: 0.1em;
        background-color: #fff;
        border-radius: 50% 0 0 50%;
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

    .delete {
        background-color: #fff;
        width: 1.5em;
        border-radius: 0 50% 50% 0;
        outline: 1px solid black;
    }
</style>