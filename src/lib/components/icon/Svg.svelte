<script lang="ts">
	import {icons} from './icons';

	export let size = 32;
	export let key = 'toilet';

	const {icon, top} = icons[key];
	const topAttr = top ? ` top: ${top};` : '';
</script>

<div class='svg-wrapper' style={`height: ${size}px; width: ${size}px;${topAttr}`}>
	<svelte:component this={icon} />
</div>

<style>
	.svg-wrapper {
		position: absolute;
	}
</style>