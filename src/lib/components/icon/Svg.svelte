<script lang="ts">
	import {icons} from './icons';

	export let size = 32;
	export let key = 'toilet';
	export let spin = false;
</script>

<div class='svg-wrapper' class:spin style={`height: ${size}px; width: ${size}px;`}>
	<svelte:component this={icons[key]} width={size} height={size} />
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