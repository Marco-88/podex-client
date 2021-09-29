<script lang="ts">
	export let text = '';

	let hidden = true;
	const toggle = () => (hidden = !hidden);
</script>

<div class="hoverable" class:hidden on:mouseenter={toggle} on:mouseleave={toggle}>
	{#if text} {text} {/if}
	<slot></slot>
</div>

<style>
	.hoverable {
		display: inline-block;
		margin: auto 0;
		position: absolute;
		right: 1rem;
		top: -1rem;
		z-index: 17;
	}
</style>