<script lang='ts'>
	import Svg from './Svg.svelte';

	export let size = 32;
	export let action = (): unknown => '';
	export let key: string = undefined;
	export let text: string = undefined;
	export let tooltip: string = undefined;
	export let round = false;
	export let fill = false;

	const style = `height: ${size}px; width: ${size}px;`;
</script>

<div class='icon-wrap' class:round class:fill on:click|stopPropagation={action} title={tooltip} {style}>
	{#if text} {text} {/if}
	<Svg {key} width={size} height={size} />
</div>