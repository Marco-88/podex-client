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

<style lang='scss' global>
	@import "static/css/variables";

	.icon-wrap {
		width: 100%;
		cursor: pointer;
		padding: 0;
	}

	.icon-wrap.fill {
		background: $primary-dark;
		padding: .45rem;
		position: relative;
	}

	.icon-wrap.fill:hover {
		background: $secondary;
		border: $thin solid $primary;
	}

    .icon-wrap svg path {
	    fill: $secondary-dark;
	    stroke: $secondary;
    }

    .icon-wrap svg:hover path {
	    fill: $secondary;
	    stroke: $secondary-light;
    }

	.icon-wrap.fill svg:hover path {
		fill: $primary-dark;
		stroke: $primary-light;
	}
</style>
