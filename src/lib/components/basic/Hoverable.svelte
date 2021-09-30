<script lang="ts">
	export let text = '';

	let hidden = true;
	const toggle = () => (hidden = !hidden);
</script>

<div class="hoverable" class:hidden on:mouseenter={toggle} on:mouseleave={toggle}>
	{#if text} {text} {/if}
	<slot></slot>
</div>

<style lang='scss'>
	.hoverable {
		display: inline-block;
		margin: auto 0;
		position: absolute;
		right: 1rem;
		top: .5rem;
		z-index: 17;
		opacity: 66%;

		&.hidden {
			opacity: 0;
		}
	}
</style>