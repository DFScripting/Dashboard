<script lang="ts">
    export let show = false
    let x = 0;
    let y = 0;

    export function open(event: MouseEvent) {
        show = true;
        x = event.clientX;
        y = event.clientY;
        setTimeout(() => {
            context.focus();
        });
    }

    export function close() {
        show = false;
    }
    
    let context : HTMLDivElement;
    function unfocus(event: FocusEvent) {
        if(!context.contains(event?.relatedTarget as Node)) close();
    }
</script>

{#if show}
    <div bind:this={context} class="contextmenu" style:--x={x} style:--y={y} on:focusout={unfocus} role="toolbar" tabindex="0">
        <slot />
    </div>
{/if}

<style>
    .contextmenu {
        position: absolute;
        left: calc(var(--x) * 1px);
        top: calc(var(--y) * 1px);
        background-color: #5b5b5b;
        padding: 0.5em;
        border-radius: 0.5em;
        color: white;
    }
</style>