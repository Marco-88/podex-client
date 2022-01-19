<script lang='ts'>
	import Svg from './Svg.svelte';

	export let size = 32;
	export let scale = 1.75;
	export let action = (): unknown => '';
	export let key = '';
	export let tooltip = '';
	export let round = false;
	export let fill = false;
	export let dark = false;

	const iconSize = Math.ceil(size * scale);
	const style = `height: ${iconSize}px; width: ${iconSize}px;`;
</script>

<div class='icon' class:round class:fill class:dark on:click|stopPropagation={action} title={tooltip} {style}>
	<Svg {key} {size} spin={key === 'spinner'}/>
</div>

<style>
	.icon {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>