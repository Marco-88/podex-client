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
		align-content: center;
		justify-content: space-between;
		width: 80%;
		margin: auto 0;
	}
</style>