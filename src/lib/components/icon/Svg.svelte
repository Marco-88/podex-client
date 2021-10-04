<script lang="ts">
	import {icons} from './icons';

	export let size = 32;
	export let key = 'toilet';
	export let spin = false;

	const {icon, top} = icons[key];
	const topAttr = top ? ` top: ${top};` : '';
</script>

<div class='svg-wrapper' class:spin style={`height: ${size}px; width: ${size}px;${topAttr}`}>
	<svelte:component this={icon} />
</div>

<style>
	.svg-wrapper {
		position: absolute;
	}

	@keyframes spin {
		to {transform: rotate(360deg);}
	}

	.svg-wrapper.spin {
		animation: spin .6s linear infinite;
	}
</style>