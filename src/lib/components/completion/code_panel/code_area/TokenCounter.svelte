<script lang="ts">
	import Icon from '../../../icon/Icon.svelte';
	export let tokenCount: number | boolean = false;
</script>

<div class="token-counter">
	{#if typeof tokenCount === 'number'}
		{tokenCount}
	{:else if tokenCount}
		<Icon key="spinner" fill={true} size={20} tooltip='Encoding Tokens'/>
	{/if}
</div>

<style lang='scss'>
	@import "../../../../../../static/css/variables";

	.token-counter {
		padding: 1rem;
	}
</style>