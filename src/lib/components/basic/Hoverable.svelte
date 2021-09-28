<script lang="ts">
	export let text: string;

	let hidden = true;
	const toggle = () => (hidden = !hidden);
</script>

<div class="hoverable" class:hidden on:mouseenter={toggle} on:mouseleave={toggle}>
	{#if text} {text} {/if}
	<slot></slot>
</div>

<style>
	.hoverable {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		width: 97%;
		margin: auto 0;
		position: absolute;
		z-index: 17;
	}
</style>