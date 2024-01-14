<script lang="ts">
    import { ArgumentTypes, type Argument, type ArgumentType } from "../../api/Actiondump";
    import type { argument } from "../../api/Script";
    import ArgumentComp from "./Argument.svelte";
    import ContextMenu from "./ContextMenu.svelte";
    import { parseSidebarDrag } from "./Utility"

    /**
     * The real arguments found in the script
     */
    export let script : argument[]
    /**
     * The argument infomation found in the actiondump.AS
     */
    export let dump : Argument[]|undefined = undefined;

    let ctx: ContextMenu;
    function add(type: ArgumentType) {
        return function (event: MouseEvent) {
            ctx.close();
            function stock(type: ArgumentType): argument {
                switch(type) {
                    // case "ANY": return
                    case "NUMBER": return {type,value:0}
                    case "TEXT": return {type,value:""}
                    // case "LIST": 
                    // case "DICTIONARY":
                    case "BOOL": return {type,value:false}
                    case "VARIABLE": return {type,value:"",scope:'SCRIPT'}
                    default: throw new TypeError('Cannot create stock value for type ' + type);
                }
            }
            script = [...script, stock(type)];
        }
    }

    let attention = false;
</script>

<div class="panel">
    <span class="args">
        {#each script as arg, i (arg)}
            <ArgumentComp bind:argument={arg} on:delete={() => {
                script.splice(i,1);
                script = script;
            }} />
        {/each}
    </span>
    <button on:click={ctx.open} on:dragover={e => {
        const {type} = parseSidebarDrag(e.dataTransfer);
        if(type == 'value') {
            e.preventDefault();
        }
    }} on:drop={e => {
        const {type,id} = parseSidebarDrag(e.dataTransfer);
        if(type != 'value') return;
    }} class="add" class:attention>+</button>
</div>
<ContextMenu bind:this={ctx}>
    <div class="ctx">
        Add
            <button title="Variable" class="add" on:click={add('VARIABLE')} ><img src={`/item/${ArgumentTypes.VARIABLE.icon.toUpperCase()}.png`} alt="Variable"></button>
            <button title="Text" class="add" on:click={add('TEXT')} ><img src={`/item/${ArgumentTypes.TEXT.icon.toUpperCase()}.png`} alt="Text"></button>
            <button title="Number" class="add" on:click={add('NUMBER')} ><img src={`/item/${ArgumentTypes.NUMBER.icon.toUpperCase()}.png`} alt="Variable"></button>
            <button title="Boolean" class="add" on:click={add('BOOL')} ><img src={`/item/${ArgumentTypes.BOOL.icon.toUpperCase()}.png`} alt="Variable"></button>
    </div>
</ContextMenu>
<svelte:body on:dragstart={e => {
    attention = parseSidebarDrag(e.dataTransfer).type == 'value';
}} on:dragend={() => {
    attention = false;
}} />

<style>
    .panel, .args {
        display: flex;
        gap: 0.5em;
    }
    
    .add {
        width: 1.5em;
        background-color: #fff;
        transition: background-color 150ms;
        outline: 1px solid black;
        border-radius: 50%;
    }
    .attention {
        background-color: #afa;
    }
    .ctx {
        display: flex;
    }
    img {
        height: 1.5em;
    }
</style>