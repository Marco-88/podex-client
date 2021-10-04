<script lang="ts">
	export let tokenCount: number | boolean = false;
</script>

<div class="token-counter">
	{#if tokenCount} {tokenCount} {/if}
</div>

<style lang='scss'>
	@import "../../../../../../static/css/variables";

	.token-counter {
		padding: 1rem;
	}
</style>