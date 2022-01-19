<script lang="ts">
	export let text = '';

	let hidden = true;
	export let right = true;
	export let left = false;
	const toggle = () => (hidden = !hidden);
</script>

<div class="hoverable" class:hidden class:right class:left on:mouseenter={toggle} on:mouseleave={toggle}>
	{#if text} {text} {/if}
	<slot></slot>
</div>

<style lang='scss'>
	.hoverable {
		display: flex;
		margin: auto 0;
		position: absolute;
		top: .5rem;
		z-index: 17;
		opacity: 66%;

		&.hidden {
			opacity: 0;
		}

		&.right {
			right: 1rem;
		}

		&.left {
			left: 1rem;
		}
	}
</style>